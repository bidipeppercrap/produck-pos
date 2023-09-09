import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const authToken = event.cookies.get("authenticationToken");

    if (!authToken && event.url.pathname != "/login") {
        throw redirect(303, "/login");
    }

    if (authToken && event.url.pathname.startsWith("/login")) {
        throw redirect(303, "/");
    }

    const response = await resolve(event);
    return response;
}