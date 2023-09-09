<script>
    import { onMount } from "svelte";
    import { posSession } from "../store";

    export let show = false;

    let orders = [];
    let closingBalance = 0;

    $: totalSessionCost = orders.reduce((acc, val) => acc += val.orderItems.reduce((acc2, val2) => acc2 += (val2.qty * val2.price), 0), 0);
    $: totalBalance = $posSession.openingBalance + totalSessionCost;

    onMount(() => {
        // fetch orders for this session
        orders = [{
            id: 1,
            orderItems: [
                {
                    price: 10,
                    qty: 2
                },
                {
                    price: 12,
                    qty: 1
                }
            ]
        },
        {
            id: 2,
            orderItems: [
                {
                    price: 12,
                    qty: -1
                }
            ]
        }];
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
                        <span>It should be: <strong>{$posSession.openingBalance}</strong> (opening balance) + <strong>{totalSessionCost}</strong> (total this session) = <strong>{totalBalance}</strong></span>
                        <span>You are missing: <strong>{totalBalance - closingBalance}</strong></span>
                    </div>
                    <input bind:value={closingBalance} type="number" class="form-control">
                </div>
                <div class="modal-body d-flex gap-2">
                    <button on:click={() => show = false} type="button" class="d-block w-100 btn btn-secondary">Cancel</button>
                    <button type="button" class="d-block w-100 btn btn-danger">Close Session</button>
                </div>
            </div>
        </div>
    </div>
</div>