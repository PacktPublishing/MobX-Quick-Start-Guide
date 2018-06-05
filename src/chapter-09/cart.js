import { computed, observable } from 'mobx';
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
});
