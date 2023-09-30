import { fetchServer } from '$lib/fetcher';

/** @type {import('./[id]/$types').RequestHandler} */
export async function POST({ fetch, locals, request, cookies }) {
    const sessionRes = await fetch("/api/current-session");
    const session = await sessionRes.json();

    const closing = await request.json();

    await fetchServer(fetch, `/possessions/close/${session.id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${locals.authToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(closing)
    });

    cookies.delete("pos_id");
    locals.posId = null;

    return new Response(JSON.stringify("fuck"));
}