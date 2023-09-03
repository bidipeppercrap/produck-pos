<script>
    export let landing = "catalog";
    export let totalCost = 0;

    let cash = 0;

    $: remainingCost = totalCost - cash;
</script>

<style>
    .page-wrapper {
        display: flex;
        padding-top: calc(2.5rem - 2px);
        flex-direction: column;
    }
    .heading {
        display: flex;
        align-items: center;
        height: 5rem;
    }
</style>

<div class="page-wrapper">
    <div class="heading">
        <button on:click={() => landing = "catalog"} type="button" style="align-self: start;" class="btn btn-secondary mt-3 ms-3">Back</button>
        <h5 class="text-center" style="flex: 1;">Payment</h5>
    </div>
    <div class="card">
        <div class="card-body" style="align-self: center;">
            <h1>{remainingCost}</h1>
        </div>
        <div class="card-body">
            <label for="cash">Cash</label>
            <input type="text" id="cash" class="form-control">
        </div>
    </div>
</div>