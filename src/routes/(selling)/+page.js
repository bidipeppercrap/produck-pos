import { products } from '../../store';

/** @type {import('../$types').PageLoad} */
export function load() {
    const data = [
        {
            id: 1,
            name: "Bearing NKN 6201 2RS",
            cost: 5.8,
            price: 10,
            barcode: "033da871-0815-475b-bd0c-7d66dc0f504a"
        },
        {
            id: 2,
            name: "Bearing NKN 6301 2RS",
            cost: 7,
            price: 12,
            barcode: "a6e81f20-8e28-47a8-b237-9be182c65335"
        },
        {
            id: 3,
            name: "Bearing NKN 6203 2RS",
            cost: 7.5,
            price: 13,
            barcode: "3444dfe2-2698-4bcf-bf64-03cdaa3d0037"
        },
        {
            id: 4,
            name: "Bearing NKN 6004 2RS",
            cost: 8,
            price: 15,
            barcode: "9c623e50-a280-4557-aafb-638e404c5747"
        },
        {
            id: 5,
            name: "Bearing NKN 6300 2RS",
            cost: 6.3,
            price: 12,
            barcode: "0726fb22-25c0-4f6d-b19f-08c718e1551d"
        },
        {
            id: 6,
            name: "Bearing NKN 6302 2RS",
            cost: 9.6,
            price: 17,
            barcode: "f6f6a584-c372-48f2-9fea-da58001e5a31"
        },
        {
            id: 7,
            name: "Bearing Nachi 6201",
            cost: 15,
            price: 23,
            barcode: "28def29b-1a05-4ed3-8747-f45f07d17e84"
        },
        {
            id: 8,
            name: "Bearing Nachi 6001",
            cost: 17,
            price: 23,
            barcode: "954523ec-062f-45d9-955a-58ea71930d4b"
        },
        {
            id: 9,
            name: "Bearing Nachi 63/22",
            cost: 48.3,
            price: 75,
            barcode: "e836646d-3d46-4685-948a-ecdc98e4c735"
        },
        {
            id: 10,
            name: "Bearing Nachi 6203",
            cost: 15.5,
            price: 27,
            barcode: "50330533-64b0-4153-8c15-6ac731cd5ff6"
        },
        {
            id: 11,
            name: "Bearing Nachi 6301",
            cost: 13.5,
            price: 23,
            barcode: "98649789-aba7-4475-8625-4ded549f9ef3"
        },
        {
            id: 12,
            name: "Bearing Nachi 6304",
            cost: 23.5,
            price: 37,
            barcode: "9f29d63e-1970-435d-bf8b-34d6fdf0745e"
        },
        {
            id: 13,
            name: "Piston Kit AHM KWB Std",
            cost: 110.5,
            price: 147,
            barcode: ""
        },
        {
            id: 14,
            name: 'Cutting Wheel Sali 4"',
            cost: 2.8,
            price: 7,
            barcode: "asd"
        },
        {
            id: 15,
            name: "Abrasive Paper Sali 600",
            cost: 2.5,
            price: 5,
            barcode: "qwe"
        }
    ];

    products.set(data);
}