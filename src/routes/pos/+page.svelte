<style>
    .page-wrapper {
        background-color: white;
        position: absolute;
        display: flex;
        height: 100%;
        width: 100%;
        z-index: 99;
        top: 0;
        left: 0;
    }
</style>

<script>
    export let data;

    let { posList } = data;
</script>

<div class="page-wrapper">
    <h1>PoS</h1>
    {#each posList as pos}
        <div>{pos.name}</div>
    {/each}
</div>