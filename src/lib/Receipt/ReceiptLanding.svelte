<script>
    import Receipt from "./Receipt.svelte";

    export let landing = "receipt";
    export let orderItems = [{
        price: 0,
        qty: 0
    }];
    export let cash = 0;
    export let customer = null;

    $: totalCost = orderItems.reduce((accumulator, currentValue) => accumulator += (currentValue.price * currentValue.qty), 0);
    $: change = cash - totalCost;
</script>

<style>
    .page-wrapper {
        display: flex;
        padding-top: calc(2.5rem - 2px);
        flex-direction: column;
    }
    .receipt-wrapper {
        max-height: 100%;
        height: 75vh;
        overflow-y: scroll;
        width: 300px;
        align-self: center;
    }

    .header {
        display: flex;
    }

    @media print {
        * {
            display: none;
        }
    }
</style>

<div class="page-wrapper">
    <div class="header p-3">
        <h1 style="flex: 1;" class="text-center">
            {#if change != 0}
                Change: {change}
            {:else}
                {totalCost}
            {/if}
        </h1>
        <button on:click={() => landing = "catalog"} type="button" class="btn btn-primary">New Order</button>
    </div>
    <div class="receipt-wrapper mt-3">
        <Receipt customer={customer ? customer.name : null} cash={cash} orderItems={orderItems} />
    </div>
</div>