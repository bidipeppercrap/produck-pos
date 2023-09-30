import { fetchServer } from '$lib/fetcher';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch, params, cookies }) {
    const res = await fetchServer(fetch, `/pos/${params.id}`, {
        headers: { "Authorization": `Bearer ${locals.authToken}` }
    });
    const result = await res.json();

    cookies.set("pos_id", result.payload.id, { path: "/" });

    const sessionRes = await fetch("/api/current-session");
    const session = await sessionRes.json();

    if (!session || session.closedAt) {
        throw redirect(307, "/open")
    };

    throw redirect(307, "/");
}