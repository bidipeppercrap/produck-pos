import { fetchServer } from '$lib/fetcher';

/** @type {import('./[id]/$types').RequestHandler} */
export async function GET({ fetch, url, locals }) {
    const page = url.searchParams.get("page");
    const sessionRes = await fetch("/api/current-session");
    const session = await sessionRes.json();

    const res = await fetchServer(fetch, `/orders/possessions/${session.id}?page=${page}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}` }
    });
    if (res.status != 200) console.log("aw");
    const result = await res.json();


    if (!result.payload) return new Response(JSON.stringify({ payload: [], pagination: result.pagination }));

    return new Response(JSON.stringify(result));
}