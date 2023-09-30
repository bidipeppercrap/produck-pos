<script>
    import { goto } from '$app/navigation';

    export let data;

    let openingBalance = data.session ? data.session.closingBalance : 0;

    async function openSession() {
        await fetch("/open", {
            method: "POST",
            body: JSON.stringify({ openingBalance })
        });

        goto("/");
    }
</script>

<div class="page-wrapper align-items-center justify-content-center">
    <div class="card specific-w-350">
        <div class="card-header">Session opening</div>
        <div class="card-body">
            <input bind:value={openingBalance} type="number" class="form-control mb-2" placeholder="Opening balance">
            <button on:click={openSession} type="button" class="btn btn-lg btn-primary w-100 d-block">Open</button>
        </div>
    </div>
</div>

<style>
    .page-wrapper {
        background-color: white;
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        z-index: 99;
        top: 0;
        left: 0;
        padding: 5rem;
    }
</style>