<script>
    /**
     * @type {string | any[]}
     */
     export let orderItems = [];
     export let displayItems = [];

    let toggledItem = "";
    let selectedItem = null;
    
    function removeFromOrder(product = { id: null }) {
        orderItems.splice(orderItems.findIndex(item => item.id == product.id), 1);
        orderItems = [...orderItems];
        if (toggledItem == product.id) toggledItem = "";
    }

    function selectItem(id) {
        const item = orderItems.filter(p => p.id == id);
        
        toggledItem = id;
        if (item[0]) selectedItem = item[0];
    }

    function toggleOptions(id = "") {
        orderItems = [...orderItems];
        if (!toggledItem) return selectItem(id);
        if (toggledItem == id) return toggledItem = "";
        selectItem(id);
    }

    function setModified(id = 0) {
        const item = orderItems.filter(p => p.id == id);
        if (item[0]) item[0].modifiedPrice = true;
    }
</script>

{#if orderItems.length > 0}
    <div class="order-wrapper">
        {#each displayItems as item (item.id)}
            <div class:bg-body-secondary={item.id == toggledItem} class="d-flex flex-column border-bottom">
                <div on:click={() => toggleOptions(item.id)} class="d-flex justify-content-between align-items-start px-3 py-2">
                    <div class="me-auto">
                        <div class="fw-bold">{item.name}</div>
                        <span class="ms-2 text-body-secondary"><strong>{item.qty}</strong> Units at {item.price} / Units</span>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                        <span class="badge text-bg-primary rounded-pill mb-1">{item.price * item.qty}</span>
                        <button style="font-size: .65rem;" on:click={() => removeFromOrder(item)} type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                </div>
                {#if item.id == toggledItem}
                    <div class="d-flex p-3 gap-2">
                        <div class="input-group">
                            <span class="input-group-text">Price</span>
                            <input on:keydown={e => e.key == "Enter" ? toggleOptions(item.id) : null} on:focus={() => setModified(item.id)} bind:value={selectedItem.price} class="form-control" type="number" id="cart-item-edit-price">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Qty</span>
                            <input on:keydown={e => e.key == "Enter" ? toggleOptions(item.id) : null} bind:value={selectedItem.qty} type="number" id="cart-item-edit-qty" class="form-control">
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{:else}
    <div class="d-flex h-100 align-items-center justify-content-center">
        <h6>Pick some products</h6>
    </div>
{/if}