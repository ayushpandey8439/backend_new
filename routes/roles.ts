import express from 'express';
import {
    assignRole,
    changeRoleLevel,
    deleteRole,
    newRole
} from '../controllers/rolesController';
import passport from 'passport';

export const roles = (app: express.Application): void => {
    const rolesRoute = express.Router();
    rolesRoute.get('/ping', (req, res) => res.send('pong').status(200).end());
    rolesRoute.post(
        '/new',
        passport.authenticate('jwt', { session: false }),
        newRole
    );
    rolesRoute.post(
        '/assign',
        passport.authenticate('jwt', { session: false }),
        assignRole
    );
    rolesRoute.post(
        '/delete',
        passport.authenticate('jwt', { session: false }),
        deleteRole
    );
    rolesRoute.post(
        '/changeLevel',
        passport.authenticate('jwt', { session: false }),
        changeRoleLevel
    );
    app.use('/roles', rolesRoute);
};
