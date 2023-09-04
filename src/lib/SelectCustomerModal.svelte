<script>
    import { onMount } from "svelte";

    export let show = false;
    /**
     * @type {any[]}
     */
     export let customers = [];
    export let selectedCustomer = null;

    let customerQuery = "";
    /**
     * @type {HTMLInputElement}
     */
    let customerQueryInput;

    $: filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(customerQuery.toLowerCase()));

    onMount(() => customerQueryInput.focus());

    function selectCustomer(customer) {
        selectedCustomer = customer;
        customerQuery = "";
        show = false;
    }
</script>

<style>
    .modal-wrapper {
        background-color: rgba(0, 0, 0, .75);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 980;
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
                    <h1 class="modal-title fs-5">Select Customer</h1>
                    <button on:click={() => {show = false;}} type="button" class="btn-close" aria-label="Close">
                </div>
                <div class="modal-body">
                    <input bind:value={customerQuery} bind:this={customerQueryInput} class="form-control" type="text" id="modal-customer" tabindex="-1">
                    {#if selectedCustomer}<button class="btn btn-secondary d-block w-100 mt-2" on:click={() => selectCustomer(null)} type="button">❌ Clear</button>{/if}
                </div>
                {#if customers.length > 0}
                    <div class="modal-body">
                        <div class="list-group">
                            {#each filteredCustomers as customer}
                                <a on:click={() => selectCustomer(customer)} class:active={customer == selectedCustomer} class="list-group-item list-group-item-action">
                                    {customer.name}
                                </a>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="modal-body">
                        No customer yet.
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>