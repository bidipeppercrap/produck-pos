<script>
    import { setContext } from "svelte";
    import { tickets, staticTicketId, currentTicket } from "../store";
    import Order from "$lib/Order.svelte";
    import ProductCatalog from "$lib/ProductCatalog.svelte";
    import renameIcon from "$lib/assets/rename.svg";

    setContext('orderItems', { addToOrder });

    let ticket = $tickets[0];

    currentTicket.subscribe(value => ticket = $tickets[value]);

    function addToOrder(product) {
        const existing = ticket.cartItems.filter(item => item.id == product.id);

        if (!existing[0]) {
            const productSnapshot = {
                ...product,
                qty: 1
            };
            ticket.cartItems = [...ticket.cartItems, productSnapshot];
        }

        if (existing[0]) {
            existing[0].qty += 1;
            ticket.cartItems = [...ticket.cartItems];
        }
    }

    function addTicket() {
        staticTicketId.update(n => n + 1);

        const ticket = {
            id: $staticTicketId,
            name: `${$staticTicketId}`,
            cartItems: [],
            productQuery: "",
            renameMode: false
        };

        tickets.set([...$tickets, ticket])
    }

    function removeTicket(i) {
        $tickets.splice(i, 1);

        tickets.set([...$tickets]);

        if (i <= $currentTicket) currentTicket.update(n => n - 1);
        if ($tickets.length < 1) addTicket();
    }

    function renameTicket(ticket, e) {
        if (e.key != "Enter") return;
        ticket.renameMode = false;  
        tickets.set([...$tickets]);
    }
</script>

<style>
    .order-actions {
        height: auto;
    }

    .page-wrapper {
        display: flex;
    }

    .rename-button {
        opacity: .5;
    }
    .rename-button:hover {
        opacity: .75;
    }
</style>

<svelte:head>
    <title>ProDuck - Point of Sale</title>
</svelte:head>

<div class="tab-wrapper">
    <ul class="position-fixed ps-3 nav nav-tabs pt-2 w-100 z-2 bg-body">
        {#each $tickets as ticket, i}
            <li class="nav-item">
                {#if ticket.renameMode}
                    <div class="rename-wrapper p-1">
                        <input bind:value={ticket.name} on:keydown={(e) => renameTicket(ticket, e)} type="text" class="form-control" style="font-size: .65rem;">
                    </div>
                {:else}
                    <a on:click={() => currentTicket.set(i)} href="/" class="nav-link d-flex align-items-center" class:active={$currentTicket == i || ticket.renameMode}>
                        {ticket.name}     
                        <img on:click={() => ticket.renameMode = true} class="ms-5 rename-button" height="15px" src={renameIcon} alt="Rename Icon">
                        <button on:click={() => removeTicket(i)} style="height: .1em; width: .1em;" type="button" class="ms-2 btn-close" aria-label="Close">
                    </a>
                {/if}
            </li>
        {/each}
        <li class="nav-item">
            <a on:click={addTicket} href="/" class="nav-link">+</a>
        </li>
    </ul>
    <div class="page-wrapper">
        <div style="margin-right: 30vw;">
            <ProductCatalog />
        </div>
        <div class="position-fixed d-flex flex-column border-start h-100 end-0" style="width: 30vw; padding-top: calc(2.5rem - 2px)">
            <div style="overflow-y: scroll; flex: 1;">
                <Order bind:orderItems={ticket.cartItems} />
            </div>
            <div class="order-actions pt-2 border-top">
                <div class="container h-100 d-flex flex-column">
                    <div class="row">
                        <div class="col">
                            <button type="button" class="w-100 btn btn-secondary">Customers</button>
                        </div>
                    </div>
                    <div class="row mt-2 mb-2 flex-fill">
                        <div class="col d-flex">
                            <button type="button" class="w-100 btn btn-primary specific-h-50">
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
</div>
