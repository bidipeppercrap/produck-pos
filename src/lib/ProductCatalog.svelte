<script>
    import { getContext } from "svelte";
    import { products, currentTicket, tickets } from "../store";
    import BarcodeNotFound from "./BarcodeNotFound.svelte";

    const { addToOrder } = getContext("orderItems");

    /**
     * @type {any[]}
     */
     export let productCatalog = [];

    let ticket = $tickets[0];
    let barcodeQuery = "";
    let scanning = false;
    let lastBarcode = "";
    let barcodeNotFound = false;

    products.subscribe((value) => {
        productCatalog = value;
    });

    currentTicket.subscribe(value => {
        ticket = $tickets[value];
    });

    function readBarcode(e) {
        if (barcodeNotFound) return;
        if (e.key == "Enter") {
            if (barcodeQuery.length > 2) {
                const product = productCatalog.filter(p => p.barcode == barcodeQuery);
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

    function enterBarcode(e) {
        if (e.key == "Enter") {
            ticket.productQuery = "";
        }
    }
</script>

<style>
    .catalog-item {
        font-size: 0.65rem;
    }
    .catalog-item:hover {
        cursor: pointer;
    }
    .product-thumbnail {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .catalog-wrapper {
        margin-top: 5.5rem;
        max-height: calc(100vh - 5.5rem);
        overflow-y: scroll;
    }
</style>

<svelte:window on:keydown={readBarcode}/>

{#if barcodeNotFound}<BarcodeNotFound bind:barcode={lastBarcode} bind:show={barcodeNotFound}/>{/if}
<div class="position-fixed bg-body border-bottom z-2" style="height: 3rem; margin-top: 2.5rem; width: calc(70vw - var(--bs-sidebar-width));">
    <div class="col d-flex justify-content-center mt-2">
        <input bind:value={ticket.productQuery} on:keydown={enterBarcode} type="text" id="product-search" class="form-control w-50 align-self-center" placeholder="Search... or use Barcode Scanner">
    </div>
</div>
<div class="container catalog-wrapper pt-3">
    <div class="row row-cols-auto g-2 mb-3">
        {#if productCatalog.length > 0}
        {#each productCatalog as product}
            <div class="col">
                <div on:click={() => addToOrder(product)} class="catalog-item card mw-100 specific-w-150">
                    {#if product.thumbnail}
                        <img src={product.thumbnail} alt="product" class="card-img-top" height="150px">
                    {:else}
                        <div class="product-thumbnail text-light">
                            <i class="gg-image">
                        </div>
                    {/if}
                    <div class="card-body p-2">
                        <p class="card-text m-0">{product.name}</p>
                        <p class="card-text m-0"><strong>{product.price}</strong></p>
                    </div>
                </div>
            </div>
        {/each}
        {:else}
            <div class="col d-flex align-items-center justify-content-center specific-h-350">
                <h1>No product yet.</h1>
            </div>
        {/if}
    </div>
</div>
