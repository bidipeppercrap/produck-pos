<script>
    import { company } from "../../store";
    export let orderItems = [];
    export let cash = 0;
    export let customer = null;
    export let orderId = 1;
    export let orderDate = Date.now();

    $: totalCost = orderItems.reduce((acc, val) => acc += (val.price * val.qty), 0);
    $: change = cash - totalCost;

    function money(number = 0) {
        const formatter = new Intl.NumberFormat("en-US");

        return formatter.format(number);
    }

    function thousand(number = 0) {
        const formatter = new Intl.NumberFormat("en-US");

        return formatter.format(number);
    }
</script>

<style>
    .receipt-container {
        display: grid;
        padding: .5rem;
    }
    .receipt-header {
        display: grid;
        margin-bottom: .5rem;
    }
    .receipt-items {
        padding-top: .25rem;
        padding-bottom: .25rem;
        margin-top: .5rem;
        display: grid;
    }
    .receipt-details {
        display: grid;
        margin-top: 1.5rem;
        font-size: .75rem;
        justify-content: center;
        text-align: center;
    }

    .order-item-single {
        display: grid;
        grid-template-areas: "n p";
        grid-template-columns: 3fr 1fr;
        grid-template-rows: auto;
        column-gap: 1rem;
    }
    .order-item-multi {
        display: grid;
        grid-template-areas: "n n" "q p";
        grid-template-columns: 3fr 1fr;
        grid-template-rows: auto;
        column-gap: 1rem;
    }
    .product-qty {
        margin-left: 2rem;
        grid-area: q;
        display: flex;
        align-items: start;
        justify-content: start;
    }
    .product-name {
        grid-area: n;
        display: flex;
        align-items: start;
        justify-content: start;
    }
    .product-price {
        grid-area: p;
        display: flex;
        align-items: start;
        justify-content: end;
    }

    .receipt-total {
        margin-bottom: .75rem;
    }

    .receipt-cost {
        display: grid;
        gap: 2.5rem;
        font-size: 1.25rem;
        grid-template-areas: "d v";
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
    }
    .receipt-cost > span.cost-description {
        grid-area: d;
        display: flex;
        align-items: start;
        justify-content: end;
    }
    .receipt-cost > span.cost-value {
        grid-area: v;
        display: flex;
        align-items: start;
        justify-content: end;
    }

    .receipt-cash {
        display: grid;
        gap: 2.5rem;
        grid-template-areas: "d v";
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
    }
    .receipt-cash > span.cash-description {
        grid-area: d;
        display: flex;
        align-items: start;
        justify-content: start;
    }
    .receipt-cash > span.cash-value {
        grid-area: v;
        display: flex;
        align-items: start;
        justify-content: end;
    }

    .receipt-customer {
        font-weight: bold;
        font-size: .75rem;
    }
</style>

<div class="receipt-container">
    <div class="receipt-header">
        {#if $company.logo}
            <img src={$company.logo} alt="Company logo">
        {:else}
            <h5 class="text-center">{$company.name}</h5>
        {/if}
        {#if customer}<div class="receipt-customer">Customer: {customer}</div>{/if}
    </div>
    <div class="receipt-items border-top border-bottom">
        {#each orderItems as item}
            {#if item.qty == 1}
                <div class="order-item-single">
                    <div class="product-name">{item.name}</div>
                    <div class="product-price">{thousand(item.price)}</div>
                </div>
            {:else}
                <div class="order-item-multi">
                    <div class="product-name">{item.name}</div>
                    <div class="product-qty">{thousand(item.qty)} Units x {thousand(item.price)}</div>
                    <div class="product-price">{thousand(item.qty * item.price)}</div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="receipt-footer">
        <div class="receipt-cost receipt-total">
            <span class="cost-description">TOTAL</span>
            <span class="cost-value">{money(totalCost)}</span>
        </div>
        <div class="receipt-cash">
            <span class="cash-description">Cash</span>
            <span class="cash-value">{thousand(cash)}</span>
        </div>
        <div class="receipt-cost">
            <span class="cost-description">CHANGE</span>
            <span class="cost-value">{money(change)}</span>
        </div>
        <div class="receipt-details">
            <div class="order-id">Order {orderId}</div>
            <div class="order-date">{orderDate}</div>
        </div>
    </div>
</div>