import { fetchServer } from '$lib/fetcher';

/** @type {import('./$types').RequestHandler} */
export async function POST({ fetch, locals, request }) {
    const order = await request.json();

    order.userId = parseInt(locals.user.jti);
    order.posId = parseInt(locals.posId);

    const res = await fetchServer(fetch, "/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${locals.authToken}` },
        body: JSON.stringify(order)
    });
    if (res.status != 204) console.log(await res.json());

    return new Response();
}