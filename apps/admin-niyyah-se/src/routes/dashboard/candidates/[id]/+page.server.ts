import { getCandidateProfile } from './getCandidateProfile.remote';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const data = await getCandidateProfile(params.id);
		return {
			candidate: data
		};
	} catch (e) {
		console.error(e);
		throw error(404, 'Candidate not found');
	}
};
