import { writable } from "svelte/store";

export const posSession = writable({
    posId: 0,
    userId: 0,
    openingBalance: 0,
    company: {
        name: "Wijaya Motor",
        logo: ""
    }
});
export const tickets = writable([
    {
        id: 1,
        name: "1",
        cartItems: [],
        productQuery: "",
        currentPage: 1,
        renameMode: false,
        landing: "catalog",
        selectedCustomer: null
    }
]);
export const products = writable([]);
export const currentTicket = writable(0);
export const staticTicketId = writable(1);
export const customers = writable([
    {
        id: 1,
        name: "Workshop Mechanics",
        priceList: [
            { productId: 14, price: 5, minQty: 0 },
            { productId: 15, price: 4, minQty: 5 }
        ]
    },
    {
        id: 2,
        name: "Partner",
        priceList: [
            { productId: 14, price: 5, minQty: 0 }
        ]
    }
]);