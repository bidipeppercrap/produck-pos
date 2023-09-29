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
        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        const res = await fetch("/login", {
            method: "POST",
            body: formData
        });

        const result = await res.json();

        if (result.type == "failure") return errorMessage = result.data;
        goto("/pos");
    }
</script>

<div class="page-wrapper">
    <div class="form-wrapper">
        <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
                {#if errorMessage}
                    <div class="alert alert-danger mb-2">
                        {errorMessage}
                    </div>
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