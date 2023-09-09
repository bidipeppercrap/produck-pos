import { redirect } from '@sveltejs/kit';
import * as jose from "jose";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const authToken = event.cookies.get("authenticationToken");
    
    if (!authToken && event.url.pathname != "/login") {
        throw redirect(303, "/login");
    }
    
    if (authToken) {
        event.locals.user = jose.decodeJwt(authToken);

        if (!event.locals.user.posSession && !event.url.pathname.startsWith("/pos")) throw redirect(303, "/pos");
        
        if (event.url.pathname.startsWith("/login")) throw redirect(303, "/pos");
    }

    const response = await resolve(event);
    return response;
}