import moment from 'moment';
import { getCoacheesToMatch } from '../../../dataStore/types/matchingDataQueries';
import {
    MIN_COACHEE_COUNT_FOR_MATCH_ATTEMPT,
    PROJECT_MATCH_INTERVAL,
} from '../../../configuration/matching-constants';
const matchInterval = PROJECT_MATCH_INTERVAL || 2; // fallback default to 2
const minCoacheeRequired = MIN_COACHEE_COUNT_FOR_MATCH_ATTEMPT || 5; // fallback default to 5
export async function projectMatchAllowed() {
    const lastMatch = moment.now();
    //TODO: fetch the date of the last execution of the matching algorithm. Possibly using a query from the DB.

    const matchingAllowed = !lastMatch
        ? false
        : moment(lastMatch)
              .add(matchInterval, 'days')
              .isSameOrBefore(moment.now());

    const CoacheeCriterionFulfilled =
        (await getCoacheesToMatch()).length >= minCoacheeRequired;

    return matchingAllowed || CoacheeCriterionFulfilled;
}
