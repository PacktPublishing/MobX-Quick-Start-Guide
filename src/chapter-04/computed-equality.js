import { action, autorun, computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ComputedEqualityExample = asComponent(() => {
    class DailyPrice {
        @observable start = 0;
        @observable end = 0;

        @computed
        // @computed.struct
        get metrics() {
            const { start, end } = this;
            return {
                delta: end - start,
            };
        }

        @action
        update(start, end) {
            this.start = start;
            this.end = end;
        }

        constructor() {
            autorun(() => {
                const { delta } = this.metrics;
                console.log(`Price Delta = ${delta}`);
            });
        }
    }

    const price = new DailyPrice();

    // Changing start and end, but metrics don't change
    price.update(0, 10);
    price.update(10, 20);
    price.update(20, 30);
});
