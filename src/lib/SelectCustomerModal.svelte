<script>
    import { createEventDispatcher, onMount } from "svelte";

    import Pagination from "$lib/Pagination.svelte";

    export let show = false;
    export let selectedCustomer = null;

    let keyword = "";
    let keywordTimer = 0;
    let searchCurrentPage = 1;
    /**
     * @type {HTMLInputElement}
     */
    let customerQueryInput;

    function keywordDebounce(event) {
        clearTimeout(keywordTimer);
        keywordTimer = setTimeout(() => keyword = event.target.value, 500);
    }

    $: searchPromise = (search)(keyword, searchCurrentPage);

    onMount(() => customerQueryInput.focus());

    async function search(keyword = "", currentPage = 1) {
        const returnData = {
            payload: [],
            pagination: { totalPages: 1, page: 1 }
        }
        const res = await fetch(`/customers?keyword=${keyword}&page=${currentPage}`);
        const result = await res.json();

        if (result.payload) returnData.payload = result.payload;
        returnData.pagination = result.pagination;

        return returnData;
    }

    function selectCustomer(customer) {
        selectedCustomer = customer;
        keyword = "";
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
                    <input bind:this={customerQueryInput} on:keyup={keywordDebounce} class="form-control" type="text" id="modal-customer" tabindex="-1">
                    {#if selectedCustomer}<button class="btn btn-secondary d-block w-100 mt-2" on:click={() => selectCustomer(null)} type="button">❌ Clear</button>{/if}
                </div>
                {#await searchPromise}
                    <h1>Loading...</h1>
                {:then { payload, pagination }} 
                    {#if payload.length > 0}
                        <div class="modal-body">
                            <div class="list-group mb-2">
                                {#each payload as item}
                                    <a on:click={() => selectCustomer(item)} class:active={selectedCustomer ? item.id == selectedCustomer.id : false} class="list-group-item list-group-item-action">
                                        {item.name}
                                    </a>
                                {/each}
                            </div>
                            <Pagination
                                on:nextPage={() => searchCurrentPage += 1}
                                on:prevPage={() => searchCurrentPage -= 1}
                                totalPages={pagination.totalPages}
                                currentPage={pagination.page}
                            />
                        </div>
                    {:else}
                        <div class="modal-body">
                            No customer yet.
                        </div>
                    {/if}
                {/await}
            </div>
        </div>
    </div>
</div>