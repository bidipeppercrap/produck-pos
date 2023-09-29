<script>
    import Order from "$lib/Order.svelte";
    import OrderList from "$lib/OrderList.svelte";
    import { onMount } from "svelte";

    export let landing = "catalog";
    export let orderItems = [];

    let orderList = [];
    let selectedOrder = null;
    $: orderitemsPromise = (fetchOrderItems)(selectedOrder);

    async function fetchOrderItems(order = null) {
        const returnData = {
            payload: []
        };

        if (!order) return returnData;

        const res = await fetch(`/api/orderitems/${order.id}`);
        const result = await res.json();

        if (result) returnData.payload = result.map(x => {
            x.name = x.product.name;
            return x;
        });
        return returnData;
    }

    onMount(async () => {
        let orderToReturn = [];
        if (orderItems.length > 0) orderToReturn = orderItems.map(i => {
            i.product = { id: i.id };
            return i;
        })

        const res = await fetch("/api/return", {
            method: "POST",
            body: JSON.stringify(orderToReturn)
        });
        const result = await res.json();

        if (result) return orderList = result;
    });

    async function returnOrder() {
        orderItems.map(async i => {
            const returnItem = (await orderitemsPromise).payload.filter(oi => oi.product.id == i.id)[0];

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
            {#await orderitemsPromise}
                <h3>Loading...</h3>
            {:then { payload }}
                <div class="disable-click">
                    <Order orderItems={payload} displayItems={payload} />
                </div>
                <div class="card-body">
                    <button on:click={returnOrder} type="button" class="w-100 d-block btn btn-danger" disabled={payload.length < 1}>Return</button>
                </div>
            {/await}
        </div>
    </div>
</div>