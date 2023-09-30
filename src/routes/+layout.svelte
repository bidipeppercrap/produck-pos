<script>
    import { goto } from "$app/navigation";
    import Navigation from "$lib/Navigation.svelte";
    import SetClosingBalance from "$lib/SetClosingBalance.svelte";

    let showClosingBalance = false;

    async function signOut() {
        await fetch("/signout", {
            method: "POST"
        });

        goto("/login");
    }

    async function closeSession(event) {
        await fetch("/close", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event.detail.closing)
        });

        goto("/pos");
    }
</script>

{#if showClosingBalance}<SetClosingBalance on:closeSession={closeSession} bind:show={showClosingBalance} />{/if}

<Navigation signOut={signOut} closeSession={() => showClosingBalance = true} />
<slot></slot>