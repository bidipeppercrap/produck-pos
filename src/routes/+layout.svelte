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
</script>

{#if showClosingBalance}<SetClosingBalance bind:show={showClosingBalance} />{/if}

<Navigation signOut={signOut} closeSession={() => showClosingBalance = true} />
<slot></slot>