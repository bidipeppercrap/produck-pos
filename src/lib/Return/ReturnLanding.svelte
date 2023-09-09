<script>
    import Order from "$lib/Order.svelte";
    import OrderList from "$lib/OrderList.svelte";
    import { onMount } from "svelte";

    export let landing = "catalog";
    export let orderItems = [];

    let orderList = [];
    let selectedOrder = null;
    $: displayItems = selectedOrder ? selectedOrder.orderItems : [];

    // send order items to server and fetch orderList
    onMount(() => {
        orderList = [{
            date: Date.now(),
            orderItems: [
                {
                    id: 1,
                    name: "Bearing NKN 6201 2RS",
                    qty: 2,
                    cost: 5.3,
                    price: 11
                }
            ]
        },
        {
            date: Date.now(),
            orderItems: [
                {
                    id: 1,
                    name: "Bearing NKN 6201 2RS",
                    qty: 5,
                    cost: 5.5,
                    price: 10
                }
            ]
        }]
    });

    function returnOrder() {
        orderItems.map(i => {
            const returnItem = (selectedOrder.orderItems.filter(ri => ri.id == i.id))[0];

            i.qty *= -1;
            i.price = returnItem.price;
            i.cost = returnItem.cost;
        });

        landing = "catalog";
    }
</script>

<style>
    .page-wrapper {
        display: flex;
        padding-top: calc(2.5rem - 2px);
        flex-direction: column;
    }
    .header {
        display: flex;
    }
    .page-body {
        display: flex;
    }
    .disable-click {
        pointer-events: none;
    }
</style>

<div class="page-wrapper">
    <div class="header p-2">
        <button on:click={() => landing = "catalog"} type="button" class="btn btn-secondary">Back</button>
        <h3 style="flex: 1;" class="text-center">Return</h3>
    </div>
    <div class="page-body p-2 gap-2">
        <div style="flex: 2;">
            <OrderList bind:selectedOrder={selectedOrder} orderList={orderList} />
        </div>
        <div class="card" style="flex: 1;">
            <div class="disable-click">
                <Order orderItems={displayItems} displayItems={displayItems} />
            </div>
            <div class="card-body">
                <button on:click={returnOrder} type="button" class="w-100 d-block btn btn-danger" disabled={displayItems.length < 1}>Return</button>
            </div>
        </div>
    </div>
</div>