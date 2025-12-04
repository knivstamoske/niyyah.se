import { z } from 'zod';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { candidateApplications } from '$lib/server/db/schema';

const currentYear = new Date().getFullYear();

export const submitApplication = form(
	z
		.object({
			name: z.string().min(1, 'Name is required').max(255),
			email: z.email().min(1, 'Email is required'),
			phone: z.string().max(50).optional(),
			birthYear: z.coerce
				.number()
				.int()
				.min(currentYear - 100, 'Invalid birth year')
				.max(currentYear - 18, 'You must be at least 18 years old'),
			gender: z.enum(['man', 'woman'], { message: 'Please select your gender' }),
			city: z.string().min(1, 'City is required').max(255),
			occupation: z.string().max(255).optional(),
			education: z.string().max(255).optional(),
			familySituation: z.string().max(1000).optional(),
			religiousPractice: z.string().max(1000).optional(),
			housingSituation: z.string().max(1000).optional(),
			intention: z.string().max(1000).optional(),
			aboutMe: z.string().max(2000).optional(),
			seekingAgeMin: z.coerce.number().int().min(18).max(100).optional(),
			seekingAgeMax: z.coerce.number().int().min(18).max(100).optional(),
			seekingCity: z.string().max(255).optional()
		})
		.refine(
			(data) => {
				if (data.seekingAgeMin !== undefined && data.seekingAgeMax !== undefined) {
					return data.seekingAgeMin <= data.seekingAgeMax;
				}
				return true;
			},
			{
				message: 'Minimum age must be less than or equal to maximum age',
				path: ['seekingAgeMin']
			}
		),
	async (data) => {
		try {
			await db.insert(candidateApplications).values({
				name: data.name.trim(),
				email: data.email.toLowerCase().trim(),
				phone: data.phone?.trim() || null,
				birthYear: data.birthYear,
				gender: data.gender,
				city: data.city.trim(),
				occupation: data.occupation?.trim() || null,
				education: data.education?.trim() || null,
				familySituation: data.familySituation?.trim() || null,
				religiousPractice: data.religiousPractice?.trim() || null,
				housingSituation: data.housingSituation?.trim() || null,
				intention: data.intention?.trim() || null,
				aboutMe: data.aboutMe?.trim() || null,
				seekingAgeMin: data.seekingAgeMin || null,
				seekingAgeMax: data.seekingAgeMax || null,
				seekingCity: data.seekingCity?.trim() || null
			});
		} catch (error: unknown) {
			console.error('Failed to submit application:', error);
			throw new Error('Failed to submit application. Please try again.');
		}
		return { success: true, message: 'Application submitted successfully!' };
	}
);
