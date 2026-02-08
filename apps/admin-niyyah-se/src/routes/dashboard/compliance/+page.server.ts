import { getBannedCandidates } from './getBannedCandidates.remote';

export const load = async () => {
    const banned = await getBannedCandidates();
    return {
        banned
    };
};
