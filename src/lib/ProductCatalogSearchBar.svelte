<script>
    import { getContext } from "svelte";
    export let productQuery = "";
    export let products = [{id: 1, barcode: ""}];

    const { addToOrder } = getContext("orderItems");

    function findProductByBarcode(e = { key: "" }) {
        if (e.key == "Enter") {
            const product = products.filter(p => p.barcode == productQuery);
            if (product[0]) addToOrder(product[0]);
        }
    }
</script>

<div class="position-fixed bg-body border-bottom z-2" style="height: 3rem; width: calc(70vw - var(--bs-sidebar-width));">
    <div class="col d-flex justify-content-center mt-2">
        <input on:keydown={findProductByBarcode} bind:value={productQuery} type="text" id="product-search" class="form-control w-50 align-self-center" placeholder="Search... or use Barcode Scanner">
    </div>
</div>