<script>
    import { setContext } from "svelte";
    import { cartItems } from "../store";
    import Order from "$lib/Order.svelte";
    import ProductCatalog from "$lib/ProductCatalog.svelte";

    setContext('orderItems', { addToOrder });

    function addToOrder(product) {
        const existing = $cartItems.filter(item => item.id == product.id);

        if (!existing[0]) {
            product.qty = 1;
            $cartItems = [...$cartItems, product]
        }

        if (existing[0]) {
            existing[0].qty += 1;
            $cartItems = [...$cartItems];
        }
    }
</script>

<style>
    .order-actions {
        height: 25vh;
    }

    .page-wrapper {
        display: flex;
    }
</style>

<svelte:head>
    <title>ProDuck - Point of Sale</title>
</svelte:head>

<div class="page-wrapper">
    <div style="margin-right: 30vw;">
        <ProductCatalog />
    </div>
    <div class="position-fixed d-flex flex-column border-start vh-100 end-0" style="width: 30vw">
        <div style="overflow: hidden; height: 75vh;">
            <Order />
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
                        <button type="button" class="w-100 btn btn-primary">
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
