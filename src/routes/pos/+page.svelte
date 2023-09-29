<style>
    .page-wrapper {
        background-color: white;
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        z-index: 99;
        top: 0;
        left: 0;
        padding: 5rem;
    }

    .card:hover {
        cursor: pointer;
    }
</style>

<script>
    import { goto } from "$app/navigation";
    import { formatDistance, format } from "date-fns";

    let keyword = "";
    let keywordTimer = 0;
    let keywordCurrentPage = 1;

    $: searchPromise = (search)(keyword, keywordCurrentPage);

    function simpleDateTime(datetime) {
        return format(new Date(datetime), "dd MMM yyyy '-' hh:mm a");
    }

    function keywordDebounce(event) {
        clearTimeout(keywordTimer);
        keywordTimer = setTimeout(() => keyword = event.target.value, 500);
    }

    async function search(keyword = "", currentPage = 1) {
        const returnData = {
            payload: [],
            pagination: null
        }
        const res = await fetch(`/pos?keyword=${keyword}&page=${currentPage}`);
        const result = await res.json();

        returnData.payload = result.payload ?? [];

        returnData.pagination = result.pagination;
        return returnData;
    }
</script>

<div class="page-wrapper">
    <h1 class="mb-5">Assigned Point of Sale</h1>
    <input on:keyup={keywordDebounce} type="text" id="keyword" class="form-control specific-w-250 mb-3" placeholder="Search Point of Sale">
    {#await searchPromise}
        <h1>Loading...</h1>
    {:then { payload, pagination }}
        {#if payload.length > 0}
            <div class="d-flex gap-3">
                {#each payload as item}
                    <div on:click={() => goto(`/pos/${item.id}`)} class="card specific-w-350">
                        <div class="card-body">
                            <h5 class="card-title">{item.name} {#if !item.lastSession.closedAt}<span class="badge text-bg-success">open</span>{/if}</h5>
                            <p class="card-text">
                                {#if item.lastSession}
                                    {#if item.lastSession.closedAt}
                                        Last session: <strong>{simpleDateTime(item.lastSession.openedAt)} - {simpleDateTime(item.lastSession.closedAt)}</strong>
                                    {:else}
                                        Opened at <strong>{simpleDateTime(item.lastSession.openedAt) + " (" + formatDistance(new Date(item.lastSession.openedAt), new Date(), { addSuffix: true }) + ")"}</strong>
                                    {/if}
                                {:else}
                                    <strong>Never opened.</strong>
                                {/if}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <h1>No Assigned POS yet.</h1>
        {/if}
    {/await}
</div>