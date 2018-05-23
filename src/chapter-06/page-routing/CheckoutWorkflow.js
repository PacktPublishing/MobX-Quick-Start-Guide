import { observable, action } from 'mobx';
import React from 'react';
import LaptopMac from '@material-ui/icons/LaptopMac';
import Headset from '@material-ui/icons/Headset';
import Keyboard from '@material-ui/icons/Keyboard';

export class CheckoutWorkflow {
    @observable step = null;

    @observable.shallow items = [];

    @action.bound
    async loadCart() {
        const items = await getCartItems();
        this.items = items;
    }

    @action.bound
    async checkoutCart() {}

    @action.bound
    async makePayment() {}

    @action.bound
    async trackOrder() {}
}

async function getCartItems() {
    await delay(500);

    return [
        { title: 'Laptop', price: 999, icon: LaptopMac },
        { title: 'Headset', price: 99, icon: Headset },
        { title: 'Keyboard', price: 49, icon: Keyboard },
    ];
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
