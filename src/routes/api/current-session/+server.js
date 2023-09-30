import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, locals, cookies }) {
    const posId = locals.posId ? locals.posId : cookies.get("pos_id");
    const posRes = await fetchServer(fetch, `/pos/${posId}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });
    const posResult = await posRes.json();

    const sessionRes = await fetchServer(fetch, `/possessions/${posResult.payload.lastSession.id}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });
    const sessionResult = await sessionRes.json();

	return new Response(JSON.stringify(sessionResult.payload));
}