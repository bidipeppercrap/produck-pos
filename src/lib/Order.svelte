<script>
    /**
     * @type {string | any[]}
     */
     export let orderItems = [];
     export let displayItems = [];

    let toggledItem = "";
    
    function removeFromOrder(product = { id: null }) {
        orderItems.splice(orderItems.findIndex(item => item.id == product.id), 1);
        orderItems = [...orderItems];
        if (toggledItem == product.id) toggledItem = "";
    }

    function toggleOptions(id = "") {
        if (!toggledItem) return toggledItem = id;
        if (toggledItem == id) return toggledItem = "";
        toggledItem = id;
    }
</script>

{#if orderItems.length > 0}
    <div class="order-wrapper">
        {#each displayItems as item (item.id)}
            <div on:click={() => toggleOptions(item.id)} class:bg-light={item.id == toggledItem} class="d-flex justify-content-between align-items-start px-3 py-2 border-bottom">
                <div class="me-auto">
                    <div class="fw-bold">{item.name}</div>
                    <span class="ms-2 text-body-secondary"><strong>{item.qty}</strong> Units at {item.price} / Units</span>
                </div>
                <div class="d-flex flex-column align-items-end">
                    <span class="badge text-bg-primary rounded-pill">{item.price * item.qty}</span>
                    <button on:click={() => removeFromOrder(item)} type="button" class="btn-close" aria-label="Close"></button>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <div class="d-flex h-100 align-items-center justify-content-center">
        <h6>Pick some products</h6>
    </div>
{/if}