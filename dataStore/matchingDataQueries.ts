import { Volunteer } from '@prisma/client';
import { dataStore } from './dataStore';

export async function getCoachMatchRequests() {
    const coachRequests = await dataStore.prisma.projectCoachMatchRequest.findMany(
        {
            include: {
                offer: true,
            },
        }
    );
    return coachRequests;
}

export async function getCoacheeMatchRequests() {
    return dataStore.prisma.projectCoacheeMatchRequest.findMany({
        where: {
            OR: [
                {
                    validUntil: {
                        gte: new Date(),
                    },
                },
                {
                    validUntil: null,
                },
            ],
        },
        include: {
            tutee: true,
            offer: true,
        },
    });
}

export async function getVolunteer(id: string): Promise<Volunteer | null> {
    return await dataStore.prisma.volunteer.findUnique({
        where: {
            id: id,
        },
    });
}

export async function storeMatches(
    matches: { helpee: { uuid: string }; helper: { uuid: string } }[]
) {
    const MatchingData = matches.map(
        (match: { helpee: { uuid: string }; helper: { uuid: string } }) => {
            return {
                active: true,
                coachMatchRequestId: match.helper.uuid,
                coacheeMatchRequestId: match.helpee.uuid,
            };
        }
    );

    return await dataStore.prisma.projectCoachingMatch.createMany({
        data: MatchingData,
    });
}
/**
 * ATTENTION!!!!!!
 * These functions are only used for testing. Do not use for normal server development.
 */

export async function makeUserVolunteer(userID: string) {
    return dataStore.prisma.volunteer.create({
        data: {
            userId: userID,
            isUniversityStudent: true,
            state: 'RP',
            university: 'testUniversity',
        },
    });
}

export async function deleteVolunteer(id: string) {
    return dataStore.prisma.volunteer.deleteMany({
        where: {
            id: id,
        },
    });
}

export async function makeUserPupil(userID: string) {
    return dataStore.prisma.pupil.create({
        data: {
            userId: userID,
            grade: 5,
            state: 'RP',
        },
    });
}

export async function deletePupil(id: string) {
    return dataStore.prisma.pupil.deleteMany({
        where: {
            id: id,
        },
    });
}

export async function createProjectCoachingOffer(volunteerId: string) {
    return dataStore.prisma.projectCoachingOffer.create({
        data: {
            volunteerId: volunteerId,
            wasJufoParticipant: true,
            hasJufoCertificate: true,
            jufoPastParticipationConfirmed: true,
            jufoPastParticipationInfo: 'Test Text',
            offerName: 'testOffer',
        },
    });
}
export async function deleteCoachingOffer(offerId: string) {
    return dataStore.prisma.projectCoachingOffer.deleteMany({
        where: {
            id: offerId,
        },
    });
}

export async function createCoacheeMatchRequest(
    pupilid: string,
    coachingOfferId: string
) {
    return dataStore.prisma.projectCoacheeMatchRequest.create({
        data: {
            pupilId: pupilid,
            offerId: coachingOfferId,
            parameters: '',
        },
    });
}
export async function deleteCoacheeMatchRequest(id: string) {
    return dataStore.prisma.projectCoacheeMatchRequest.deleteMany({
        where: {
            id: id,
        },
    });
}

export async function createCoachingMatchRequest(coachingOfferId: string) {
    return dataStore.prisma.projectCoachMatchRequest.create({
        data: {
            offerId: coachingOfferId,
        },
    });
}

export async function deleteCoachingMatchRequest(matchId: string) {
    return dataStore.prisma.projectCoachMatchRequest.deleteMany({
        where: {
            id: matchId,
        },
    });
}

export async function deleteMatch(coachMatchId: string) {
    return dataStore.prisma.projectCoachingMatch.deleteMany({
        where: {
            coachMatchRequestId: coachMatchId,
        },
    });
}

export async function getProjectMatches() {
    return dataStore.prisma.projectCoachingMatch.findMany({});
}
