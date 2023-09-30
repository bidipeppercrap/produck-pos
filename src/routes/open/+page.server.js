/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies }) {
    cookies.delete("pos_opening");
    
    const sessionRes = await fetch("/api/current-session");
    const session = await sessionRes.json();

    cookies.set("pos_opening", "true", { path: "/" });
    
    return { session };
}