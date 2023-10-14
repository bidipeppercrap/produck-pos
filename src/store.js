import { writable } from "svelte/store";

export const user = writable();
export const pos = writable();
export const company = writable({
    name: "Wijaya Motor",
    logo: ""
})
export const tickets = writable([
    {
        id: 1,
        name: "1",
        cartItems: [],
        productQuery: "",
        currentPage: 1,
        renameMode: false,
        landing: "catalog",
        selectedCustomer: null,
        receipt: {
            orderItems: [{
                id: 0,
                name: "",
                price: 0,
                qty: 0
            }],
            cash: 0,
            customer: null
        }
    }
]);
export const products = writable([]);
export const currentTicket = writable(0);
export const staticTicketId = writable(1);

export const customers = writable([]);