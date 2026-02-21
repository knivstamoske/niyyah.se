import { getCandidates } from '../candidates/getCandidates.remote';

export const load = async () => {
    // Cast types as any for compatibility with schema constraints if needed, or refine schema
    const filters = { status: 'verifying' as any, gender: 'all' as any, search: '' };
    const candidates = await getCandidates(filters);
    return {
        candidates
    };
};
