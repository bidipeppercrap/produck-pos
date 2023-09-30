import { redirect } from '@sveltejs/kit';
import * as jose from "jose";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const authToken = event.cookies.get("auth_token");
    const posId = event.cookies.get("pos_id");
    const posOpening = event.cookies.get("pos_opening");
    event.locals.posId = posId;
    
    if (!authToken && event.url.pathname != "/login") {
        throw redirect(307, "/login");
    }
    
    if (authToken) {
        event.locals.authToken = authToken;
        event.locals.user = jose.decodeJwt(authToken);
        
        if (!event.url.pathname.startsWith("/pos") && !posId) throw redirect(307, "/pos");
    }
    
    if (authToken && posId) {
        if (!event.url.pathname.startsWith("/open") && posOpening) {
            throw redirect(307, "/open");
        }
    }

    const response = await resolve(event);
    return response;
}