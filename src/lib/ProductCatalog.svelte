<script>
    import { getContext } from "svelte";
    import { products } from "../store";
    import BarcodeNotFound from "./BarcodeNotFound.svelte";

    const { addToOrder } = getContext("orderItems");

    export let productCatalog = [];

    products.subscribe((value) => {
        productCatalog = value;
    })
    
    let productQuery = "";
    let barcodeQuery = "";
    let scanning = false;
    let lastBarcode = "";
    let barcodeNotFound = false;

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
            productQuery = "";
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
</style>

<svelte:window on:keydown={readBarcode}/>

{#if barcodeNotFound}<BarcodeNotFound bind:barcode={lastBarcode} bind:show={barcodeNotFound}/>{/if}
<div class="position-fixed bg-body border-bottom z-2" style="height: 3rem; width: calc(70vw - var(--bs-sidebar-width));">
    <div class="col d-flex justify-content-center mt-2">
        <input bind:value={productQuery} on:keydown={enterBarcode} type="text" id="product-search" class="form-control w-50 align-self-center" placeholder="Search... or use Barcode Scanner">
    </div>
</div>
<div class="container" style="padding-top: 5rem; max-height: 100vh; overflow-y: scroll;">
    <div class="row row-cols-auto g-2 mb-3">
        {#if productCatalog.length > 0}
        {#each productCatalog as product}
            <div class="col">
                <div on:click={() => addToOrder(product)} class="catalog-item card mw-100 specific-w-150">
                    <img src="" alt="product" class="card-img-top" height="150px">
                    <div class="card-body">
                        <p class="card-text">{product.name}</p>
                        <p class="card-text"><strong>{product.price}</strong></p>
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
