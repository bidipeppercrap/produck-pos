<script>
    import { page } from "$app/stores";

    const routes = [
        {
            icon: "🛒",
            title: "Sell",
            route: "/"
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
    <div class="d-flex flex-column p-2 g-2" style="gap: var(--bs-gutter-y);">
        {#each routes as r}
            <a href={r.route} class="nav-link">
                <button type="button" class="btn w-100" class:btn-secondary={r.route != path} class:btn-primary={r.route == path}>
                    <div class="d-flex flex-column">
                        <div class="fs-5">{r.icon}</div>
                        <div class="text-secondary" style="font-size: .65rem!important;">{r.title}</div>
                    </div>
                </button>
            </a>
        {/each}
    </div>
</nav>