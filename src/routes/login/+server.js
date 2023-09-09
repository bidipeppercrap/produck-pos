import { json } from '@sveltejs/kit';
import * as jose from "jose";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, cookies }) {
    const credentials = await request.json();

    try {
        // get the token and decode
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicm9vdCIsImlkIjoxLCJuYW1lIjoiYmlkaXBlcHBlcmNyYXAiLCJ1c2VybmFtZSI6ImJpZGlwZXBwZXJjcmFwIiwiaWF0IjoxNTE2MjM5MDIyfQ.kXNjkhPWF62Lqd46TC8dfkDI99vwlNwYQOSOFSlPWtQ";
        const user = jose.decodeJwt(token);
        
        cookies.set("authenticationToken", token);
        locals.user = user;
    } catch (err) {
        return json({ error: "Invalid JSON"});
    }
    
    return json({ data: true });
}