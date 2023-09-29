import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, locals, params }) {
    const res = await fetchServer(fetch, `/orderitems/orders/all/${params.id}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });
    const result = await res.json();

    if (!result.payload) return new Response(JSON.stringify([]));

	return new Response(JSON.stringify(result.payload));
}