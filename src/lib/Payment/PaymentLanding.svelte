<script>
    import { getContext, onMount } from "svelte";

    export let landing = "catalog";
    export let totalCost = 0;

    const { pay } = getContext("payment");

    let cash = 0;
    /**
     * @type {HTMLInputElement}
     */
    let cashInput;

    $: remainingCost = totalCost - cash;

    onMount(() => cashInput.select());
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
    <div class="d-flex flex-column align-items-center gap-2 align-self-center" style="width: 20rem;">
        <div class="card w-100">
            <div class="card-body" style="align-self: center;">
                <h1>{remainingCost}</h1>
            </div>
            <div class="card-body">
                <div class="input-group">
                    <span class="input-group-text">Cash</span>
                    <input bind:this={cashInput} bind:value={cash} type="text" id="cash" class="form-control">
                </div>
            </div>
        </div>
        <button on:click={() => pay(cash)} disabled={remainingCost > 0 || isNaN(remainingCost)} type="button" class="btn btn-primary d-block w-100 specific-h-50">Pay</button>
    </div>
</div>