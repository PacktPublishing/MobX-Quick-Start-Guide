import { action, observable, reaction } from 'mobx';
import { asComponent } from '../core/as-component';

export const InfiniteReactionExample = asComponent(() => {
    class Infinite {
        @observable counter = 0;

        constructor() {
            reaction(
                () => this.counter,
                counterValue => {
                    console.log(`Counter is ${counterValue}`);
                    this.spinLoop();
                },
            );
        }

        @action
        spinLoop() {
            this.counter = this.counter + 1;
        }
    }

    new Infinite().spinLoop();
});
