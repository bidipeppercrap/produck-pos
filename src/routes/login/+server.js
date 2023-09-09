import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, cookies }) {
    const credentials = await request.json();

    try {
        // get the token
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicm9vdCIsImlkIjoxLCJuYW1lIjoiYmlkaXBlcHBlcmNyYXAiLCJ1c2VybmFtZSI6ImJpZGlwZXBwZXJjcmFwIiwiaWF0IjoxNTE2MjM5MDIyfQ.kXNjkhPWF62Lqd46TC8dfkDI99vwlNwYQOSOFSlPWtQ";
        
        cookies.set("authenticationToken", token);
    } catch (err) {
        return json({ error: "Invalid JSON"});
    }
    
    return json({ data: true });
}