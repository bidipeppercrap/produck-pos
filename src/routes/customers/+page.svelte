<script>
    import Pagination from "$lib/Pagination.svelte";

    let keyword = "";
    let keywordTimer = 0;
    let searchCurrentPage = 1;

    let selectedCustomer = null;

    $: searchPromise = (search)(keyword, searchCurrentPage);

    function keywordDebounce(event) {
        clearTimeout(keywordTimer);
        keywordTimer = setTimeout(() => keyword = event.target.value, 500);
    }

    async function search(keyword = "", currentPage = 1) {
        const returnData = {
            payload: [],
            pagination: {
                totalPages: 1,
                page: 1
            }
        };

        const res = await fetch(`/customers?keyword=${keyword}&page=${currentPage}`);
        const result = await res.json();

        returnData.payload = result.payload ?? [];
        returnData.pagination = result.pagination;
        return returnData;
    }
</script>

<div class="container-fluid p-5">
    <h1 class="mb-5">Customers</h1>
    <input on:keyup={keywordDebounce} type="text" id="keyword" class="form-control specific-w-350 mb-3" placeholder="Search customers">
    {#await searchPromise}
        <h3>Loading...</h3>
    {:then {payload, pagination}} 
        {#if payload.length > 0}
            <div class="row">
                <div class="col">
                    <div class="list-group mb-3">
                        {#each payload as item}
                            <a href="#top" class:active={selectedCustomer == item} on:click={() => selectedCustomer = item} class="list-group-item list-group-item-action">{item.name}</a>
                        {/each}
                    </div>
                    <Pagination
                        on:nextPage={() => searchCurrentPage += 1}
                        on:prevPage={() => searchCurrentPage -= 1}
                        totalPages={pagination.totalPages}
                        currentPage={pagination.page}
                    />
                </div>
                <div class="col-5">
                    {#if selectedCustomer}
                        <div class="card">
                            <div class="card-header">{selectedCustomer.name}</div>
                            {#if selectedCustomer.phone || selectedCustomer.address}
                                <div class="list-group list-group-flush">
                                    {#if selectedCustomer.phone}
                                        <div class="list-group-item">
                                            <strong>Phone: </strong>{selectedCustomer.phone}
                                        </div>
                                    {/if}
                                    {#if selectedCustomer.address}
                                        <div class="list-group-item">
                                            <strong>Address: </strong>{selectedCustomer.address}
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div class="card-body">
                                    <div class="card-text">
                                        No detail information.
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <h3>No customer yet.</h3>
        {/if}
    {/await}
</div>