<script>
    export let show = false;
    export let orderItems = [];

    $: totalCost = orderItems.reduce((acc, val) => acc += (val.qty * val.cost), 0);
    $: totalPrice = orderItems.reduce((acc, val) => acc += (val.qty * val.price), 0);
    $: totalMargin = ((totalPrice - totalCost) / totalPrice) * 100;

    function thousand(number = 0) {
        const formatter = new Intl.NumberFormat("en-US");

        return formatter.format(number);
    }
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

    .cart-margins {
        height: 50vh;
        overflow-y: scroll;
    }

    .list-group-item > .calculation {
        display: flex;
        padding-left: 2rem;
        gap: .5rem;
    }
</style>

<div class="modal-wrapper">
    <div class="modal" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Order Details</h1>
                </div>
                <div class="modal-body">
                    <div class="cart-margins">
                        <div class="list-group">
                            {#each orderItems as item}
                                <div class="list-group-item">
                                    <span><strong>{item.name}</strong></span>
                                    <div class="calculation">
                                        <span>Profit per Item = {thousand(item.price)} - {thousand(item.cost)}</span>
                                        <span style="font-weight: bold;">= {thousand(item.price - item.cost)}</span>
                                    </div>
                                    <div class="calculation">
                                        <span>Total cost = {thousand(item.qty)} x {thousand(item.cost)}</span>
                                        <span style="font-weight: bold;">= {thousand(item.cost * item.qty)}</span>
                                    </div>
                                    <div class="calculation">
                                        <span>Total price = {thousand(item.qty)} x {thousand(item.price)}</span>
                                        <span style="font-weight: bold;">= {thousand(item.price * item.qty)}</span>
                                    </div>
                                    <div class="calculation">
                                        <span>Total profit = {thousand(item.price * item.qty)} - {thousand(item.cost * item.qty)}</span>
                                        <span style="font-weight: bold;">= {thousand((item.price * item.qty) - (item.cost * item.qty))}</span>
                                    </div>
                                    <div class="calculation">
                                        <span><strong>Margin = {Math.floor((((item.price * item.qty) - (item.cost * item.qty)) / (item.price * item.qty)) * 100)}%</strong></span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <h6 class="mb-3">Total Order Margin = {Math.floor(totalMargin)}%</h6>
                    <button on:click={() => show = false} type="button" class="d-block w-100 btn btn-outline-danger">❌ Close</button>
                </div>
            </div>
        </div>
    </div>
</div>