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
        place-items: center;
        justify-content: center;
    }

    .form-wrapper {
        width: 25%;
    }
</style>

<script>
    import { goto } from "$app/navigation";

    let errorMessage = "";
    let credentials = {
        username: "",
        password: ""
    }

    async function login() {
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "content-type": "application/json"
            }
        });

        const { data, error } = await response.json();

        if (error) {
            errorMessage = error;
        }

        if (data) {
            goto("/pos");
        };
    }
</script>

<div class="page-wrapper">
    <div class="form-wrapper">
        <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
                {#if errorMessage}
                    {errorMessage}
                {/if}
                <div class="input-group mb-2">
                    <span class="input-group-text">Username</span>
                    <input bind:value={credentials.username} type="text" class="form-control">
                </div>
                <div class="input-group mb-2">
                    <span class="input-group-text">Password</span>
                    <input bind:value={credentials.password} type="password" class="form-control">
                </div>
                <button on:click={login} type="button" class="d-block w-100 btn btn-lg btn-primary">Login</button>
            </div>
        </div>
    </div>
</div>