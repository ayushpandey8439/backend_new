import moment from 'moment';
import {
    MIN_COACHEE_COUNT_FOR_MATCH_ATTEMPT,
    PROJECT_MATCH_INTERVAL,
} from '../../../configuration/matching-constants';
import {getCoacheeMatchRequests} from "../../../dataStore/matchingDataQueries";
const matchInterval = PROJECT_MATCH_INTERVAL || 2; // fallback default to 2
const minCoacheeRequired = MIN_COACHEE_COUNT_FOR_MATCH_ATTEMPT || 5; // fallback default to 5
export async function TutoringMatchAllowed() {
    const lastMatch = moment().subtract(5, 'days');
    //TODO: fetch the date of the last execution of the matching algorithm. Possibly using a query from the DB.

    const matchingAllowed = !lastMatch
        ? false
        : moment(lastMatch)
              .add(matchInterval, 'days')
              .isSameOrBefore(moment.now());

    const CoacheeCriterionFulfilled =
        (await getCoacheeMatchRequests()).length >= minCoacheeRequired;

    return matchingAllowed || CoacheeCriterionFulfilled;
}
