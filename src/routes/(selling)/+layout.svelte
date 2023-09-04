<script>
    import { tickets, staticTicketId, currentTicket } from "../../store";
    import renameIcon from "$lib/assets/rename.svg";

    function addTicket() {
        staticTicketId.update(n => n + 1);

        const ticket = {
            id: $staticTicketId,
            name: `${$staticTicketId}`,
            cartItems: [],
            productQuery: "",
            currentPage: 1,
            renameMode: false,
            landing: "catalog",
            selectedCustomer: null,
        };

        tickets.set([...$tickets, ticket])
    }

    function removeTicket(i) {
        if ($tickets.length === 1) {
            const newTicket = {
                id: $staticTicketId,
                name: `${$staticTicketId}`,
                cartItems: [],
                productQuery: "",
                currentPage: 1,
                renameMode: false,
                landing: "catalog",
                selectedCustomer: null,
            };

            tickets.set([newTicket]);

            currentTicket.set(0);

            return;
        }

        $tickets.splice(i, 1);

        tickets.set([...$tickets]);

        if (i <= $currentTicket && $currentTicket > 0) currentTicket.update(n => n - 1);
    }

    function renameTicket(ticket, e) {
        if (e.key != "Enter") return;
        ticket.renameMode = false;  
        tickets.set([...$tickets]);
    }
</script>

<style>
    .rename-button {
        opacity: .5;
    }
    .rename-button:hover {
        opacity: .75;
    }
</style>

<div class="tab-wrapper">
    <ul class="position-fixed ps-3 nav nav-tabs pt-2 w-100 z-2 bg-body">
        {#each $tickets as ticket, i (ticket.id)}
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
    <slot></slot>
</div>
