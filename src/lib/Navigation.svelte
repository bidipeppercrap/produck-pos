<script>
    import { page } from "$app/stores";

    export let closeSession;
    export let signOut;

    const routes = [
        {
            icon: "🛒",
            title: "Sell",
            route: "/",
        },
        {
            icon: "🧾",
            title: "Orders",
            route: "/orders"
        },
        {
            icon: "👤",
            title: "Customers",
            route: "/customers"
        }
    ];

    $: path = $page.route.id;
</script>

<nav class="sidebar">
    <div class="d-flex specific-h-100 border-bottom">
        <div class="align-self-center sidebar-brand">PoS</div>
    </div>
    <div class="d-flex flex-column p-2 g-2" style="gap: var(--bs-gutter-y); height: 100%;">
        {#each routes as r}
            <a href={r.route} class="nav-link">
                <button type="button" class="btn w-100" class:btn-secondary={r.route != path && (r.route != "/" || (path?.includes("/(selling)") ? false : true) )} class:btn-primary={r.route == path || (path ? path.includes("/(selling)") : false)}>
                    <div class="d-flex flex-column">
                        <div class="fs-5">{r.icon}</div>
                        <div class="text-secondary" style="font-size: .65rem!important;">{r.title}</div>
                    </div>
                </button>
            </a>
        {/each}
        <div style="flex: 1;"></div>
        <a class="nav-link">
            <button on:click={closeSession} type="button" class="btn btn-outline-danger w-100">
                <div class="d-flex flex-column">
                    <div class="fs-5">❌</div>
                    <div style="font-size: .65rem!important;">Close</div>
                </div>
            </button>
        </a>
        <a class="nav-link">
            <button on:click={signOut} type="button" class="btn btn-outline-secondary w-100">
                <div class="d-flex flex-column">
                    <div style="font-size: .65rem!important;">Sign Out</div>
                </div>
            </button>
        </a>
    </div>
</nav>