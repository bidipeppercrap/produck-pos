<script>
    export let productQuery = "";
</script>

<div class="position-fixed bg-body border-bottom z-2" style="height: 3rem; width: calc(70vw - var(--bs-sidebar-width));">
    <div class="col d-flex justify-content-center mt-2">
        <input bind:value={productQuery} type="text" id="product-search" class="form-control w-50 align-self-center" placeholder="Search... or use Barcode Scanner">
    </div>
</div>