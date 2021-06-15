import { dataStore } from '../dataStore';

export async function getCoachesToMatch() {
    return dataStore.prisma.projectCoachingOffer.findMany({
        where: {
            OR: [
                { jufoPastParticipationConfirmed: true },
                { hasJufoCertificate: true },
                { wasJufoParticipant: true },
            ],
        },
        include: {
            volunteer: true,
        },
    });
}


export async function getCoacheesToMatch() {
    return dataStore.prisma.projectCoacheeMatchRequest.findMany({
        where: {
            OR: [
                { jufoPastParticipationConfirmed: true },
                { hasJufoCertificate: true },
                { wasJufoParticipant: true },
            ],
        },
        include: {
            volunteer: true,
        },
    });
}
