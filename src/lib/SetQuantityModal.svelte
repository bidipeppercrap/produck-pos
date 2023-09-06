<script>
    import { onMount } from "svelte";

    export let qty = 1;
    export let show = false;

    let qtyInput = { select: () => {} };
    let qtyDone = false;

    onMount(() => qtyInput.select());

    function waitingBarcode(e = { key: "" }) {
        if (e.key == "Enter") {
            qtyDone = true;
        }
    }
</script>

<style>
    .modal-wrapper {
        background-color: rgba(0, 0, 0, .75);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 980;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .modal-wrapper > .modal {
        top: auto;
        height: auto;
    }
</style>

<div class="modal-wrapper">
    <div class="modal" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Set Quantity</h1>
                    <button on:click={() => {qty = 1; show = false;}} type="button" class="btn-close" aria-label="Close">
                </div>
                <div class="modal-body">
                    <input disabled={qtyDone} on:keydown={waitingBarcode} bind:value={qty} bind:this={qtyInput} class="form-control" type="text" id="modal-qty" tabindex="-1">
                </div>
            </div>
        </div>
    </div>
</div>