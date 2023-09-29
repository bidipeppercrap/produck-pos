<script>
    import { toStringDelimit } from "./numbering";
    import { format } from "date-fns";

    export let orderList = [];
    export let selectedOrder = null;

    function simpleDateTime(datetime) {
        return format(new Date(datetime), "dd MMM yyyy '-' hh:mm a");
    }
</script>

<div class="list-group">
    {#each orderList as order}
        <a on:click={() => selectedOrder = order} class="list-group-item list-group-item-action d-flex">
            <div><span class="badge text-bg-secondary">{simpleDateTime(order.createdAt)}</span></div>
            <div class="vr mx-3"></div>
            <div><span class="badge text-bg-success">{toStringDelimit(order.totalPrice)}</span> total cost</div>
            <div class="vr mx-3"></div>
            <div>Served by <strong>{order.servedBy.name ? order.servedBy.name : order.servedBy.username}</strong></div>
        </a>
    {/each}
</div>