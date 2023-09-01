import { writable } from "svelte/store";

export const products = writable([]);
export const cartItems = writable([]);
export const currentTicket = writable(0);
export const staticTicketId = writable(1);
export const tickets = writable([
    {
        id: 1,
        name: "1",
        cartItems: [],
        productQuery: "",
        renameMode: false
    }
]);