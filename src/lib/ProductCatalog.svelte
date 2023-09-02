<script>
    import { afterUpdate, getContext } from "svelte";
    import BarcodeNotFound from "./BarcodeNotFound.svelte";
    import ChevronLeft from "$lib/assets/chevron-left.svg";
    import ChevronRight from "$lib/assets/chevron-right.svg";

    const { addToOrder } = getContext("orderItems");

    /**
     * @type {any[]}
     */
     export let productCatalog = [];
    export let currentPage = 1;

    $: paginatedProducts = productCatalog.slice((currentPage - 1) * pageLimit, currentPage * pageLimit);

    let barcodeQuery = "";
    let scanning = false;
    let lastBarcode = "";
    let barcodeNotFound = false;

    const pageLimit = 12;

    function readBarcode(e = { key: "" }) {
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
        max-height: calc(100vh - 5.5rem);
        height: calc(100vh - 5.5rem);
        overflow-y: scroll;
    }
</style>

<svelte:window on:keydown={readBarcode}/>

{#if barcodeNotFound}<BarcodeNotFound bind:barcode={lastBarcode} bind:show={barcodeNotFound}/>{/if}
<div class="container catalog-wrapper pt-3">
    {#if productCatalog.length > 0}
        <div class="row row-cols-auto g-2 mb-3">
            {#each paginatedProducts as product (product.id)}
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
        </div>
        {#if productCatalog.length > pageLimit}
            <ul class="pagination justify-content-center">
                <li on:click={() => {if (currentPage != 1) currentPage--}} class="page-item" class:disabled={currentPage == 1}>
                    <a class="page-link" aria-label="Previous">
                        <img src={ChevronLeft} alt="Previous">
                    </a>
                </li>
                <li on:click={() => {if (Math.ceil(productCatalog.length / pageLimit) != currentPage) currentPage++}} class="page-item" class:disabled={Math.ceil(productCatalog.length / pageLimit) == currentPage}>
                    <a class="page-link" aria-label="Next">
                        <img src={ChevronRight} alt="Next">
                    </a>
                </li>
            </ul>
        {/if}
    {:else}
        <div class="col d-flex align-items-center justify-content-center specific-h-350">
            <h1>No product yet.</h1>
        </div>
    {/if}
</div>
