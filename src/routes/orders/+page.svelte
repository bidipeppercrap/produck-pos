<script>
    import Order from "$lib/Order.svelte";
    import OrderList from "$lib/OrderList.svelte";
    import Pagination from "$lib/Pagination.svelte";

    let searchCurrentPage = 1;
    let selectedOrder = null;

    $: searchPromise = (search)(searchCurrentPage);
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

    async function search(currentPage = 1) {
        const returnData = {
            payload: [],
            pagination: {
                totalPages: 1,
                page: 1
            }
        }
        const res = await fetch(`/api/orders/possessions?page=${currentPage}`);
        const result = await res.json();

        returnData.payload = result.payload ?? [];
        returnData.pagination = result.pagination;
        return returnData;
    }
</script>

<div class="container-fluid p-5">
    <h1 class="mb-5">Orders for this session</h1>
    {#await searchPromise}
        <h3>Loading...</h3>
    {:then {payload, pagination}} 
        {#if payload.length > 0}
            <div class="d-flex gap-2">
                <div style="flex: 2;">
                    <div class="mb-3">
                        <OrderList bind:selectedOrder={selectedOrder} orderList={payload} />
                    </div>
                    <Pagination
                        on:nextPage={() => searchCurrentPage += 1}
                        on:prevPage={() => searchCurrentPage -= 1}
                        totalPages={pagination.totalPages}
                        currentPage={pagination.page}
                    />
                </div>
                <div class="card" style="flex: 1;">
                    {#await orderitemsPromise}
                        <h3>Loading...</h3>
                    {:then { payload }}
                        <div class="disable-click">
                            <Order orderItems={payload} displayItems={payload} />
                        </div>
                    {/await}
                </div>
            </div>
        {/if}
    {/await}
</div>

<style>
    .disable-click {
        pointer-events: none;
    }
</style>