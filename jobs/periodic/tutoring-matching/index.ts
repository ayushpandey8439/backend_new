import { TutoringMatchAllowed } from './precheck';
import { logInfo } from '../../../services/logger';
import {
    getTuteeMatchRequests,
    getTutorMatchRequests,
    storeTutoringMatches,
} from '../../../dataStore/matchingDataQueries';

import { match as computeMatching, Stats } from 'corona-school-matching';
import { getTuteesFromRequests, getTutorsFromRequests } from './transform';

export async function executeTutoringMatch() {
    if (!(await TutoringMatchAllowed())) {
        logInfo('Match precheck failed. No matching done today');
        return;
    }
    await createTutoringMatches();
}

export async function createTutoringMatches() {
    const tutorRequests = await getTutorMatchRequests();
    const tuteeRequests = await getTuteeMatchRequests();

    /* This transformation is only required for backwards compatibility with the old backend.*/
    const helpers = await getTutorsFromRequests(tutorRequests);
    const helpees = await getTuteesFromRequests(tuteeRequests);
    logInfo('Helpers:: ' + JSON.stringify(helpers));
    logInfo('Helpees:: ' + JSON.stringify(helpees));
    const MatchingResult = computeMatching(helpers, helpees);
    const storedMatches = storeTutoringMatches(MatchingResult.matches);
}
