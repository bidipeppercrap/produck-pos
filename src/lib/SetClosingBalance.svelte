<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { toStringDelimit } from "./numbering";

    const dispatch = createEventDispatcher();

    export let show = false;

    let totalSessionPrice = 0;
    let closingBalance = 0;
    let closingRemark = "";
    let openingBalance = 0;

    $: totalBalance = openingBalance + totalSessionPrice;

    onMount(async () => {
        const res = await fetch("/api/current-session");
        const result = await res.json();

        openingBalance = result.openingBalance;
        totalSessionPrice = result.totalSalesPrice;
    });
</script>

<style>
    .modal-wrapper {
        background-color: rgba(0, 0, 0, .75);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
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
                    <h1 class="modal-title fs-5">Closing Balance</h1>
                </div>
                <div class="modal-body">
                    <div class="card p-2 mb-2">
                        <span>It should be: <br>
                            <strong>{toStringDelimit(openingBalance)}</strong> (opening balance) + <strong>{toStringDelimit(totalSessionPrice)}</strong> (total this session)<br>
                            = <strong>{toStringDelimit(totalBalance)}</strong>
                        </span><br>
                        <span>You are missing: <strong>{toStringDelimit(totalBalance - closingBalance)}</strong></span>
                    </div>
                    <input bind:value={closingBalance} type="number" class="form-control mb-2">
                    <textarea bind:value={closingRemark} class="form-control" rows="5" placeholder="Closing remark"></textarea>
                </div>
                <div class="modal-body d-flex gap-2">
                    <button on:click={() => show = false} type="button" class="d-block w-100 btn btn-secondary">Cancel</button>
                    <button on:click={() => {dispatch("closeSession", { closing: { closingBalance, closingRemark } }); show = false;}} type="button" class="d-block w-100 btn btn-danger">Close Session</button>
                </div>
            </div>
        </div>
    </div>
</div>