import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, cookies }) {
    cookies.set("authenticationToken", "");
    locals.user = null;

    return json({});
}