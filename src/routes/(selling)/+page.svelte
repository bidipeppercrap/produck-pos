<script>
    import { setContext } from "svelte";
    import { tickets, currentTicket, products } from "../../store";
    import Order from "$lib/Order.svelte";
    import ProductCatalog from "$lib/ProductCatalog.svelte";
    import BarcodeNotFound from "$lib/BarcodeNotFound.svelte";
    import ProductCatalogSearchBar from "$lib/ProductCatalogSearchBar.svelte";

    setContext('orderItems', { addToOrder });

    let ticket = $tickets[0];
    let productQuery = "";

    $: filteredProducts = ($products.filter(p => p.name.toLowerCase().includes(productQuery.toLowerCase())));

    tickets.subscribe(value => ticket = value[$currentTicket]);
    currentTicket.subscribe(value => ticket = $tickets[value]);

    let barcodeQuery = "";
    let scanning = false;
    let lastBarcode = "";
    let barcodeNotFound = false;

    function readBarcode(e = { key: "" }) {
        if (barcodeNotFound) return;
        if (e.key == "Enter") {
            if (barcodeQuery.length > 2) {
                const product = $products.filter(p => p.barcode == barcodeQuery);
                if (!product[0]) { barcodeNotFound = true; lastBarcode = barcodeQuery; };
                if (product[0]) addToOrder(product[0]);
    
                barcodeQuery = "";
            }
        } else {
            if (e.key == "Shift") return;
            barcodeQuery += e.key;
        };

        if (!scanning) {
            scanning = true;
            setTimeout(() => {
                barcodeQuery = "";
                scanning = false;
            }, 200);
        }
    }

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
        }
    }
</script>

<style>
    .order-actions {
        height: auto;
    }

    .page-wrapper {
        display: flex;
        padding-top: calc(2.5rem - 2px);
    }

    .catalog-container {
        padding-top: 3rem;
    }
</style>

<svelte:head>
    <title>ProDuck - Point of Sale</title>
</svelte:head>

<svelte:window on:keydown={readBarcode}/>

{#if barcodeNotFound}<BarcodeNotFound bind:barcode={lastBarcode} bind:show={barcodeNotFound}/>{/if}

<div class="page-wrapper">
    <div style="margin-right: 30vw; width: 100%;">
        <ProductCatalogSearchBar bind:productQuery={productQuery} />
        <div class="catalog-container">
            <ProductCatalog pageLimit={10} bind:currentPage={ticket.currentPage} bind:productCatalog={filteredProducts} />
        </div>
    </div>
    <div class="position-fixed d-flex flex-column border-start end-0" style="width: 30vw; height: calc(100vh - 2.5rem + 2px);">
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
