<script>
    import { setContext } from "svelte";
    import { tickets, currentTicket, products } from "../../store";
    import { goto } from "$app/navigation";
    import Order from "$lib/Order.svelte";
    import ProductCatalog from "$lib/ProductCatalog.svelte";
    import ProductCatalogSearchBar from "$lib/ProductCatalogSearchBar.svelte";

    setContext('orderItems', { addToOrder });

    let ticket = $tickets[0];
    let productQuery = "";

    $: filteredProducts = ($products.filter(p => p.name.toLowerCase().includes(productQuery.toLowerCase())));

    tickets.subscribe(value => ticket = value[$currentTicket]);
    currentTicket.subscribe(value => ticket = $tickets[value]);

    function addToOrder(product = { id: 0 }) {
        const existing = ticket.cartItems.filter(item => item.id == product.id);

        if (!existing[0]) {
            const productSnapshot = {
                ...product,
                qty: 1
            };
            ticket.cartItems = [...ticket.cartItems, productSnapshot];
        }

        if (existing[0]) {
            existing[0].qty += 1;
            ticket.cartItems = [...ticket.cartItems];
        }
    }

    function processPayment() {
        if (ticket.cartItems.length > 0) {
            goto("/payment/" + ticket.id);
        }
    }
</script>

<style>
    .order-actions {
        height: auto;
    }

    .page-wrapper {
        display: flex;
    }
</style>

<svelte:head>
    <title>ProDuck - Point of Sale</title>
</svelte:head>

<div class="page-wrapper">
    <div style="margin-right: 30vw; width: 100%;">
        <ProductCatalogSearchBar bind:productQuery={productQuery} />
        <ProductCatalog bind:currentPage={ticket.currentPage} bind:productCatalog={filteredProducts} />
    </div>
    <div class="position-fixed d-flex flex-column border-start h-100 end-0" style="width: 30vw; padding-top: calc(2.5rem - 2px)">
        <div style="overflow-y: scroll; flex: 1;">
            <Order bind:orderItems={ticket.cartItems} />
        </div>
        <div class="order-actions pt-2 border-top">
            <div class="container h-100 d-flex flex-column">
                <div class="row">
                    <div class="col">
                        <button type="button" class="w-100 btn btn-secondary">Customers</button>
                    </div>
                </div>
                <div class="row mt-2 mb-2 flex-fill">
                    <div class="col d-flex">
                        <button on:click={processPayment} type="button" class="w-100 btn btn-primary specific-h-50">
                            <div class="flex flex-column">
                                <div class="fs-5">Payment</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
