import { getVolunteer } from '../../../dataStore/matchingDataQueries';
import { State } from '../../../dataStore/types/state';
import { PersonID } from 'corona-school-matching';
import {
    MAX_TUTOR_GRADE,
    MIN_TUTOR_GRADE,
} from '../../../configuration/matching-constants';

export async function getTutorsFromRequests(
    TutorRequests: any
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
        TutorRequests.map(
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
                return await tutorHelperTransform(Request, index);
            }
        )
    );
}

export async function getTuteesFromRequests(
    TuteeRequests: any
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
        TuteeRequests.map(
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
                return await tuteeHelpeeTransform(Request, index);
            }
        )
    );
}

async function tuteeHelpeeTransform(
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
        subjects: tutoringSubjectTransform(Request.subjects),
        grade: Request.tutee.grade,
        matchingPriority: 10,
    };
}

async function tutorHelperTransform(
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
        subjects: tutoringSubjectTransform(Request.offer.subjects),
    };
}

function tutoringSubjectTransform(
    Subjects: string
): {
    name: string;
    gradeRestriction: { min: number; max: number };
}[] {
    const parsedSubjects = JSON.parse(Subjects);
    if (parsedSubjects.length == 0) {
        return [];
    } else {
        return parsedSubjects.map(
            (subject: { name: any; minGrade: any; maxGrade: any }) => {
                return {
                    name: subject.name,
                    gradeRestriction: subject.minGrade
                        ? {
                              min: subject.minGrade,
                              max: subject.maxGrade,
                          }
                        : {
                              min: MIN_TUTOR_GRADE,
                              max: MAX_TUTOR_GRADE,
                          },
                };
            }
        );
    }
}
