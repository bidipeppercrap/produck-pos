<script>
    import { onMount, setContext } from "svelte";
    import { tickets, currentTicket, products, customers } from "../../store";
    import Order from "$lib/Order.svelte";
    import ProductCatalog from "$lib/ProductCatalog.svelte";
    import BarcodeNotFound from "$lib/BarcodeNotFound.svelte";
    import ProductCatalogSearchBar from "$lib/ProductCatalogSearchBar.svelte";
    import PaymentLanding from "$lib/Payment/PaymentLanding.svelte";
    import SetQuantityModal from "$lib/SetQuantityModal.svelte";
    import SelectCustomerModal from "$lib/SelectCustomerModal.svelte";
    import ReceiptLanding from "$lib/Receipt/ReceiptLanding.svelte";
    import CartDetails from "$lib/CartDetails.svelte";
    import ReturnLanding from "$lib/Return/ReturnLanding.svelte";
    import { toStringDelimit } from "$lib/numbering";

    export let data;

    onMount(() => products.set(data.payload));

    setContext('orderItems', { addToOrder });
    setContext('payment', { pay })

    let ticket = $tickets[0];
    let productQuery = "";
    let setQuantityMode = false;
    let selectCustomerModal = false;
    let showCartDetail = false;
    let productQty = 1;
    let receipt = {
        orderItems: [{
            id: 0,
            name: "",
            price: 0,
            qty: 0
        }],
        cash: 0,
        customer: null
    };

    let prices_resolved = false;
    $: prices = (fetchCustomerPrices)(ticket.selectedCustomer).then(() => prices_resolved = true);
    $: totalCost = currentCart.reduce((accumulator, currentValue) => accumulator + (currentValue.qty * currentValue.price), 0);
    $: filteredProducts = ($products.filter(p => p.name.toLowerCase().includes(productQuery.toLowerCase())));
    $: currentCart = getCart(ticket.cartItems, ticket.selectedCustomer, prices, prices_resolved);

    tickets.subscribe(value => ticket = value[$currentTicket]);
    currentTicket.subscribe(value => ticket = $tickets[value]);

    let barcodeQuery = "";
    let scanning = false;
    let lastBarcode = "";
    let barcodeNotFound = false;

    function getCart(cartItems, selectedCustomer, prices, pricesResolved = false) {
        const cart = cartItems.map(p => {
            let productPrice = p.price;

            let customerPrice = [];
            if (pricesResolved) customerPrice = selectedCustomer ? prices.filter(pl => pl.productId == p.id && pl.minQty <= p.qty) : [];

            if (customerPrice.length > 0) productPrice = customerPrice[0].price;
            if (p.modifiedPrice) productPrice = p.price;

            const product = {
                id: p.id,
                name: p.name,
                qty: p.qty,
                price: productPrice,
                cost: p.cost,
                barcode: p.barcode
            };

            return product;
        });

        return cart;
    }

    function findProductByBarcode(products = [{ id: 1, barcode: "" }], barcode = "") {
        return products.filter(p => p.barcode == barcode);
    }

    function pageKeydownListener(e = { key: "", altKey: "", ctrlKey: "" }) {
        if (e.altKey && e.key == "q") {
            setQuantityMode = true;
        } else if (e.ctrlKey && e.key == " ") {
            if (ticket.landing == "catalog") processPayment();
            if (ticket.landing == "receipt") ticket.landing = "catalog";
        } else {
            readBarcode(e, productQty);
        }
    }

    function readBarcode(e = { key: "" }, qty = 1) {
        if (barcodeNotFound) return;
        if (e.key == "Enter") {
            if (barcodeQuery.length > 2) {
                if (isNaN(qty)) {
                    barcodeNotFound = true;
                    lastBarcode = "Invalid Qty";
                    return;
                }
                if (typeof qty == "string") qty = parseInt(qty);
                const product = findProductByBarcode($products, barcodeQuery);
                if (!product[0]) { barcodeNotFound = true; lastBarcode = barcodeQuery; };
                if (product[0]) {
                    addToOrder(product[0], qty)
                    productQty = 1;
                    setQuantityMode = false;
                };
    
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

    function addToOrder(product = { id: 0 }, qty = 1) {
        const existing = ticket.cartItems.filter(item => item.id == product.id);

        if (!existing[0]) {
            const productSnapshot = {
                ...product,
                qty: qty
            };
            ticket.cartItems = [...ticket.cartItems, productSnapshot];
        }

        if (existing[0]) {
            existing[0].qty += qty;
            ticket.cartItems = [...ticket.cartItems];
        }
    }

    function processPayment() {
        if (ticket.cartItems.length > 0) {
            ticket.landing = "payment";
        }
    }

    async function pay(cash = "0") {
        receipt = {
            orderItems: [...currentCart],
            cash: parseInt(cash),
            customer: ticket.selectedCustomer
        };

        const orderItems = currentCart.map(ci => {
            ci.product = { id: ci.id }

            return ci;
        });

        const order = {
            customerId: ticket.selectedCustomer ? ticket.selectedCustomer.id : null,
            items: orderItems
        };

        await fetch("/api/orders", {
            method: "POST",
            body: JSON.stringify(order)
        });

        ticket.cartItems = [];
        ticket.selectedCustomer = null;
        ticket.productQuery = "";
        ticket.currentPage = 1;

        ticket.landing = "receipt";
    }

    async function fetchCustomerPrices(customer) {
        let returnData = [];

        if (!customer) return returnData;

        const res = await fetch(`/customerprices/customers/all/${customer.id}`);
        const result = await res.json();

        if (result) returnData = result;

        return returnData;
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

<svelte:window on:keydown={pageKeydownListener}/>

{#if barcodeNotFound}<BarcodeNotFound bind:barcode={lastBarcode} bind:show={barcodeNotFound}/>{/if}
{#if setQuantityMode}<SetQuantityModal bind:qty={productQty} bind:show={setQuantityMode} />{/if}
{#if selectCustomerModal}<SelectCustomerModal bind:selectedCustomer={ticket.selectedCustomer} bind:show={selectCustomerModal} />{/if}
{#if showCartDetail}<CartDetails bind:orderItems={currentCart} bind:show={showCartDetail} />{/if}

{#if ticket.landing == "payment"}
<PaymentLanding bind:totalCost={totalCost} bind:landing={ticket.landing} />
{:else if ticket.landing == "receipt"}
<ReceiptLanding bind:landing={ticket.landing} orderItems={receipt.orderItems} cash={receipt.cash} customer={receipt.customer} />
{:else if ticket.landing == "return"}
<ReturnLanding bind:landing={ticket.landing} bind:orderItems={ticket.cartItems} />
{:else}
<div class="page-wrapper">
    <div style="margin-right: 30vw; width: 100%;">
        <ProductCatalogSearchBar bind:products={$products} bind:productQuery={productQuery} />
        <div class="catalog-container">
            <ProductCatalog pageLimit={10} bind:currentPage={ticket.currentPage} bind:productCatalog={filteredProducts} />
        </div>
    </div>
    <div class="position-fixed d-flex flex-column border-start end-0" style="width: 30vw; height: calc(100vh - 2.5rem + 2px);">
        <div style="overflow-y: scroll; flex: 1;">
            <Order bind:orderItems={ticket.cartItems} bind:displayItems={currentCart} />
        </div>

        <div class="order-actions pt-2 border-top">

            {#if totalCost > 0}
                <div class="border-bottom pe-2 mb-2">
                    <h6 class="text-end">Total: {toStringDelimit(totalCost)}</h6>
                </div>
            {/if}

            <div class="container h-100 d-flex flex-column">
                {#if ticket.cartItems.length > 0}
                    <div class="row mb-2 gap-2">
                        <div class="col pe-0">
                            <button on:click={() => showCartDetail = true} type="button" class="d-block w-100 btn btn-outline-secondary">Info</button>
                        </div>
                        <div class="col ps-0">
                            <button on:click={() => ticket.landing = "return"} type="button" class="d-block w-100 btn btn-outline-danger">Return</button>
                        </div>
                    </div>
                {/if}
                <div class="row">
                    <div class="col">
                        <button on:click={() => selectCustomerModal = true} type="button" class="w-100 btn btn-secondary">👤 {ticket.selectedCustomer ? ticket.selectedCustomer.name : "Customer"}</button>
                    </div>
                </div>
                <div class="row mt-2 mb-2 flex-fill">
                    <div class="col d-flex">
                        <button disabled={ticket.cartItems.length < 1} on:click={processPayment} type="button" class="w-100 btn btn-primary specific-h-50">
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
{/if}

