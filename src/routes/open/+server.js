import { fetchServer } from '$lib/fetcher';

/** @type {import('./[id]/$types').RequestHandler} */
export async function POST({ fetch, locals, request, cookies }) {
    const { openingBalance } = await request.json();

    const session = {
        openingBalance,
        userId: parseInt(locals.user.jti),
        posId: parseInt(locals.posId)
    }

    await fetchServer(fetch, `/possessions`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${locals.authToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(session)
    });

    cookies.delete("pos_opening");

    return new Response(JSON.stringify("fuck"));
}