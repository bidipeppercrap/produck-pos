import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, cookies }) {
    cookies.delete("auth_token");
    locals.user = null;
    locals.pos = null;

    return json({});
}