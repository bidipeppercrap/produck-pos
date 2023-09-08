<script>
    export let orderList = [];
    export let selectedOrder = null;
</script>

<div class="list-group">
    {#each orderList as order}
        <a on:click={() => selectedOrder = order} class="list-group-item list-group-item-action d-flex">
            <div>{order.date}</div>
            <div class="vr mx-3"></div>
            <div>{order.orderItems.length} items</div>
            <div class="vr mx-3"></div>
            <div>{order.orderItems.reduce((acc, val) => acc += (val.price * val.qty), 0)} total cost</div>
        </a>
    {/each}
</div>