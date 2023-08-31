<script>
    export let barcode = "";
    export let show = false;
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
</style>

<div class="modal-wrapper">
    <div class="modal" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Product not found</h1>
                    <button on:click={() => {barcode = ""; show = false;}} type="button" class="btn-close" aria-label="Close">
                </div>
                <div class="modal-body">Could not find product with barcode: {barcode}</div>
            </div>
        </div>
    </div>
</div>