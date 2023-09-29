import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function POST({ fetch, locals, request }) {
    const items = await request.json();

    const res = await fetchServer(fetch, "/orders/return", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${locals.authToken}` },
        body: JSON.stringify(items)
    });
    if (res.status != 200) console.log(res);

    const result = await res.json();
    if (!result.payload) return new Response(JSON.stringify([]));

    return new Response(JSON.stringify(result.payload));
}