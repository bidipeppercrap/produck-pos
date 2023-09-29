import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, locals, url }) {
    const res = await fetchServer(fetch, `${url.pathname}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });
    const result = await res.json();

	return new Response(JSON.stringify(result));
}