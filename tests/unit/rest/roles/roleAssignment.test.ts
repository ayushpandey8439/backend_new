import {
    addUser,
    deleteTestRoles,
    deleteUser,
    findRole,
    getUserRole,
    setupTestRoles,
    setupTestTasks,
    setupTestUserAdminRole,
    setupTestUserPupilRole,
    tearDownTestTasks,
} from '../../../../services/dataStore';

process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import { server } from '../../../../server';
import { invalidUserPhone, validUser } from '../../../userConfiguration';

describe('Try to assign roles to user', async function () {
    before(async function () {
        const user = await addUser(validUser);
        await setupTestRoles();
        await setupTestUserAdminRole(user.id);
        await setupTestTasks();
    });
    after(async function () {
        await deleteUser(validUser.email);
        await deleteTestRoles();
        await tearDownTestTasks();
    });
    it('Assigns a role with login credentials that allow role assignment', function (done) {
        const loginDetail = {
            email: validUser.email,
            password: validUser.password,
        };
        chai.request(server)
            .post('/auth/login')
            .type('json')
            .send(loginDetail)
            .end(async (error, response) => {
                const accessToken = response.body.response.accessToken;
                chai.request(server)
                    .post('/roles/assign')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .type('json')
                    .send({ role: 'unitTestVolunteer' })
                    .end(async (error, response) => {
                        try {
                            chai.assert.hasAllKeys(response.body, [
                                'id',
                                'userId',
                                'roleName',
                                'createdOn',
                            ]);
                            const userRoles = await getUserRole(
                                response.body.userId
                            );
                            const roleNames = userRoles.map(
                                (obj) => obj.roleName
                            );
                            chai.assert.include(roleNames, 'unitTestVolunteer');
                            done();
                        } catch (e) {
                            done(e);
                        }
                    });
            });
    });
});

describe('Try to create roles', async function () {
    before(async function () {
        const user = await addUser(validUser);
        await setupTestRoles();
        await setupTestUserPupilRole(user.id);
        await setupTestTasks();
    });
    after(async function () {
        await deleteUser(validUser.email);
        await deleteTestRoles();
        await tearDownTestTasks();
    });

    it('Create a role with login credentials that dont allow role assignment', function (done) {
        const loginDetail = {
            email: validUser.email,
            password: validUser.password,
        };
        chai.request(server)
            .post('/auth/login')
            .type('json')
            .send(loginDetail)
            .end(async (error, response) => {
                const accessToken = response.body.response.accessToken;
                chai.request(server)
                    .post('/roles/assign')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .type('json')
                    .send({ role: 'unitTestVolunteer' })
                    .end(async (error, response) => {
                        try {
                            chai.assert.equal(response.status, 401);
                            chai.assert.equal(
                                response.text,
                                'User not authorised to perform this operation'
                            );
                            done();
                        } catch (e) {
                            done(e);
                        }
                    });
            });
    });
});
