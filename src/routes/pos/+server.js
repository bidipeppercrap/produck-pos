import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch, locals }) {
    const keyword = url.searchParams.get("keyword");
    const page = url.searchParams.get("page");
    const res = await fetchServer(fetch, `${url.pathname}?keyword=${keyword}&page=${page}&userId=${locals.user.jti}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });

    const result = await res.json();

	return new Response(JSON.stringify(result));
}