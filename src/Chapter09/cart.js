import {
    $mobx,
    autorun,
    computed,
    getAtom,
    getDependencyTree,
    getObserverTree,
    observable,
} from 'mobx';
import { asComponent } from '../core/as-component';

export const ShoppingCartExample = asComponent(() => {
    class Coupon {
        @observable isValid = false;

        /*...*/
    }

    class CouponManager {
        @observable.ref coupons = [];

        @computed
        get validCoupons() {
            return this.coupons.filter(coupon => coupon.isValid);
        }

        /*...*/
    }

    class ShoppingCart {
        @observable.shallow items = [];

        couponManager = new CouponManager();

        @computed
        get coupons() {
            return this.couponManager.validCoupons;
        }

        @computed
        get description() {
            return `Cart has ${this.items.length} item(s) with ${
                this.coupons.length
            } coupon(s) applied.`;
        }

        /*...*/
    }

    const cart = (window.cart = new ShoppingCart());
    const disposer = autorun(() => {
        console.log(cart.description);
    });

    const descriptionAtom = cart[$mobx].values.get('description');
    // const descriptionAtom = getAtom(cart, 'description');
    console.log(getDependencyTree(descriptionAtom));
    console.log(getObserverTree(descriptionAtom));

    // console.log(getDependencyTree(disposer[$mobx]));
    console.log(getDependencyTree(getAtom(disposer)));
});

const depTree = {
    name: 'Autorun@14',
    dependencies: [
        {
            name: 'ShoppingCart@16.description',
            dependencies: [
                { name: 'ShoppingCart@16.items' },
                { name: 'ShoppingCart@16.items' },
                {
                    name: 'ShoppingCart@16.coupons',
                    dependencies: [
                        {
                            name: 'CouponManager@19.validCoupons',
                            dependencies: [
                                { name: 'CouponManager@19.coupons' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
