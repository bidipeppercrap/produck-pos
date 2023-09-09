import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const posList = [];

    if (locals.user.posSession) {
        throw redirect(303, "/")
    }

    return { posList };

    throw error(404, 'Not found');
}