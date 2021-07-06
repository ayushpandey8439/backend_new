import { getVolunteer } from '../../../dataStore/matchingDataQueries';
import { State } from '../../../dataStore/types/state';
import { PersonID } from 'corona-school-matching';

export async function getCoachesFromRequests(
    CoachRequests: any
): Promise<
    {
        id: number;
        uuid: string;
        createdAt: Date;
        state: State;
        excludeMatchesWith: PersonID[];
        matchRequestCount: number;
        subjects: [
            { name: string; gradeRestriction: { min: number; max: number } }
        ];
    }[]
> {
    return await Promise.all(
        CoachRequests.map(
            async (
                Request: any,
                index: number
            ): Promise<{
                id: any;
                uuid: any;
                createdAt: any;
                state: string | null;
                excludeMatchesWith: never[];
                matchRequestCount: number;
                subjects: {
                    name: string;
                    gradeRestriction: { min: number; max: number };
                }[];
            }> => {
                return await coachHelperTransform(Request, index);
            }
        )
    );
}

export async function getCoacheesFromRequests(
    coacheeRequests: any
): Promise<
    {
        createdAt: any;
        excludeMatchesWith: any[];
        matchRequestCount: number;
        subjects: { name: string }[];
        grade: number;
        id: any;
        state: any;
        uuid: any;
        matchingPriority: number;
    }[]
> {
    return await Promise.all(
        coacheeRequests.map(
            async (
                Request: any,
                index: number
            ): Promise<{
                id: any;
                uuid: any;
                createdAt: any;
                state: any;
                excludeMatchesWith: never[];
                matchRequestCount: number;
                subjects: { name: string }[];
                grade: number;
                matchingPriority: number;
            }> => {
                return await coacheeHelpeeTransform(Request, index);
            }
        )
    );
}

async function coacheeHelpeeTransform(
    Request: any,
    index: number
): Promise<{
    id: any;
    uuid: any;
    createdAt: any;
    state: any;
    excludeMatchesWith: never[];
    matchRequestCount: number;
    subjects: any[];
    grade: number;
    matchingPriority: number;
}> {
    return {
        id: index, // This is for backwards compatibility with the old matching algorithm.
        // Id is actually supposed to be the uuid in the datamodel
        uuid: Request.id,
        createdAt: Request.createdAt,
        state: Request.tutee.state,
        excludeMatchesWith: [],
        matchRequestCount: 1,
        subjects: [{ name: Request.offer.offerName }],
        grade: Request.tutee.grade,
        matchingPriority: 10,
    };
}

async function coachHelperTransform(
    Request: any,
    index: number
): Promise<{
    id: any;
    uuid: any;
    createdAt: any;
    state: string | null;
    excludeMatchesWith: never[];
    matchRequestCount: number;
    subjects: {
        name: string;
        gradeRestriction: { min: number; max: number };
    }[];
}> {
    const volunteer = await getVolunteer(Request.offer.volunteerId);

    return {
        id: index, // This is for backwards compatibility with the old matching algorithm.
        // Id is actually supposed to be the uuid in the datamodel
        uuid: Request.id,
        createdAt: Request.offer.createdAt,
        state: volunteer == null ? '' : volunteer.state,
        excludeMatchesWith: [],
        matchRequestCount: 1,
        subjects: [
            {
                name: Request.offer.offerName,
                gradeRestriction: { min: 1, max: 10 },
            },
        ],
    };
}
