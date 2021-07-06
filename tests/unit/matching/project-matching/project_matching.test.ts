import { addUser } from '../../../../dataStore/types/user';
import { pupil, validUser, volunteer } from '../../../userConfiguration';
import chai from 'chai';
import {
    createCoacheeMatchRequest,
    createCoachingMatchRequest,
    createProjectCoachingOffer,
    deleteCoacheeMatchRequest,
    deleteCoachingMatchRequest,
    deleteCoachingOffer,
    deleteMatch,
    deletePupil,
    deleteVolunteer,
    getProjectMatches,
    makeUserPupil,
    makeUserVolunteer,
} from '../../../../dataStore/matchingDataQueries';
import { deleteUser } from '../../../../dataStore/testingQueries';
import { executeProjectMatch } from '../../../../jobs/periodic/project-matching';
import { logInfo } from '../../../../services/logger';

process.env.NODE_ENV = 'test';
process.env.PROJECT_MATCH_INTERVAL = '0';

describe.only('Project Matching Tests', function () {
    before(async function () {
        const pupilUser = await addUser(pupil);
        const volunteerUser = await addUser(volunteer);
        const Volunteer = await makeUserVolunteer(volunteerUser.id);
        const Pupil = await makeUserPupil(volunteerUser.id);
        const coachingOffer = await createProjectCoachingOffer(Volunteer.id);
        const CoachingMatchRequest = await createCoachingMatchRequest(
            coachingOffer.id
        );
        const CoacheeMatchRequest = await createCoacheeMatchRequest(
            Pupil.id,
            coachingOffer.id
        );

        this.coachingMatchRequest = CoachingMatchRequest;
        this.coacheeMatchRequest = CoacheeMatchRequest;
        this.coachingOffer = coachingOffer;
        this.Volunteer = Volunteer;
        this.Pupil = Pupil;
    });

    after(async function () {
        await deleteMatch(this.coachingMatchRequest.id);
        await deleteCoachingMatchRequest(this.coachingMatchRequest.id);
        await deleteCoacheeMatchRequest(this.coacheeMatchRequest.id);
        await deleteCoachingOffer(this.coachingOffer.id);
        await deleteVolunteer(this.Volunteer.id);
        await deletePupil(this.Pupil.id);
        await deleteUser(pupil.email);
        await deleteUser(volunteer.email);
    });
    it('should Match the Helper with the Helpee', async function () {
        await executeProjectMatch();
        const Matches = await getProjectMatches();
        logInfo('Matches: ' + JSON.stringify(Matches));
        let matchSaved = false;

        Matches.forEach((match) => {
            if (match.coachMatchRequestId == this.coachingMatchRequest.id) {
                matchSaved = true;
            }
        });

        chai.assert.equal(matchSaved, true);
    });
});
