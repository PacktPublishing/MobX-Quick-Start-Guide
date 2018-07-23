import { action, autorun, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ObservableStructExample = asComponent(() => {
    class Sphere {
        @observable.struct location = { x: 0, y: 0 };

        constructor() {
            autorun(() => {
                console.log(
                    `Current location: (${this.location.x}, ${
                        this.location.y
                    })`,
                );
            });
        }

        @action
        moveTo(x, y) {
            this.location = { x, y };
        }
    }

    let x = new Sphere();

    x.moveTo(0, 0);
    x.moveTo(20, 30);
});
