import { fetchServer } from '$lib/fetcher';

/** @type {import('../$types').PageServerLoad} */
export async function load({ locals, fetch }) {
    const res = await fetchServer(fetch, "/products/all", {
        headers: { "Authorization": `Bearer ${locals.authToken}`}
    });
    const result = await res.json();

    if (result.result) return { payload: result.result };
}