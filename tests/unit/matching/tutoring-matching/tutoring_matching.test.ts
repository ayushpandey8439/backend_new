import { addUser } from '../../../../dataStore/types/user';
import { pupil, validUser, volunteer } from '../../../userConfiguration';
import chai from 'chai';
import {
    createTuteeMatchRequest,
    createTutoringOffer,
    createTutorMatchRequest,
    deletePupil,
    deleteTuteeMatchRequest,
    deleteTutoringMatch,
    deleteTutoringOffer,
    deleteTutorMatchRequest,
    deleteVolunteer,
    getTutoringMatches,
    makeUserPupil,
    makeUserVolunteer,
} from '../../../../dataStore/matchingDataQueries';
import { deleteUser } from '../../../../dataStore/testingQueries';
import { logInfo } from '../../../../services/logger';
import { executeTutoringMatch } from '../../../../jobs/periodic/tutoring-matching';

process.env.NODE_ENV = 'test';
process.env.PROJECT_MATCH_INTERVAL = '0';

describe('Tutoring Matching Tests', function () {
    before(async function () {
        const pupilUser = await addUser(pupil);
        const volunteerUser = await addUser(volunteer);
        const Volunteer = await makeUserVolunteer(volunteerUser.id);
        const Pupil = await makeUserPupil(pupilUser.id);
        const TutoringOffer = await createTutoringOffer(Volunteer.id);
        const TutorMatchRequest = await createTutorMatchRequest(
            TutoringOffer.id
        );
        const TuteeMatchRequest = await createTuteeMatchRequest(Pupil.id);

        this.TutorMatchRequest = TutorMatchRequest;
        this.TuteeMatchRequest = TuteeMatchRequest;
        this.TutoringOffer = TutoringOffer;
        this.Volunteer = Volunteer;
        this.Pupil = Pupil;
    });

    after(async function () {
        await deleteTutoringMatch(this.TutorMatchRequest.id);
        await deleteTutorMatchRequest(this.TutorMatchRequest.id);
        await deleteTuteeMatchRequest(this.TuteeMatchRequest.id);
        await deleteTutoringOffer(this.TutoringOffer.id);
        await deleteVolunteer(this.Volunteer.id);
        await deletePupil(this.Pupil.id);
        await deleteUser(pupil.email);
        await deleteUser(volunteer.email);
    });
    it('should Match the Helper with the Helpee', async function () {
        await executeTutoringMatch();
        const Matches = await getTutoringMatches();
        logInfo('Matches: ' + JSON.stringify(Matches));
        let matchSaved = false;

        Matches.forEach((match) => {
            if (match.tutorMatchRequestId == this.TutorMatchRequest.id) {
                matchSaved = true;
            }
        });
        chai.assert.equal(matchSaved, true);
    });
});
