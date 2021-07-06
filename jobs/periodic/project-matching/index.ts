import { projectMatchAllowed } from './precheck';
import { logInfo } from '../../../services/logger';
import {
    getCoacheeMatchRequests,
    getCoachMatchRequests, storeMatches,
} from '../../../dataStore/matchingDataQueries';

import { match as computeMatching, Stats } from 'corona-school-matching';
import { getCoacheesFromRequests, getCoachesFromRequests } from './transform';

export async function executeProjectMatch() {
    if (!(await projectMatchAllowed())) {
        logInfo('Match precheck failed. No matching done today');
        return;
    }
    await createProjectMatches();
}

export async function createProjectMatches() {
    const projectCoachesRequests = await getCoachMatchRequests();
    const projectCoacheesRequests = await getCoacheeMatchRequests();

    /* This transformation is only required for backwards compatibility with the old backend.*/
    const helpers = await getCoachesFromRequests(projectCoachesRequests);
    const helpees = await getCoacheesFromRequests(projectCoacheesRequests);

    const MatchingResult = computeMatching(helpers, helpees);
    const storedMatches = storeMatches(MatchingResult.matches);
    logInfo(JSON.stringify(MatchingResult));
}
