import { projectMatchAllowed } from './precheck';
import { logInfo } from '../../../services/logger';
import {getCoachesToMatch} from "../../../dataStore/types/matchingDataQueries";

export async function execute() {
    if (!(await projectMatchAllowed())) {
        logInfo('Match precheck failed. No matching done today');
        return;
    }
    await createProjectMatches();
}



export async function createProjectMatches(){
    const projectCoaches = await getCoachesToMatch();

}