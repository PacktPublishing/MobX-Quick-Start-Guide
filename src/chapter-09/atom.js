import { autorun, createAtom } from 'mobx';
import { asComponent } from '../core/as-component';

class Atom {
    observers = [];

    reportObserved() {}
    reportChanged() {}

    /* ... */
}

export const AtomExample = asComponent(() => {
    class Clock {
        constructor() {
            this.atom = createAtom(
                'Clock',
                () => {
                    this.startTicking();
                },
                () => {
                    this.stopTicking();
                },
            );

            this.intervalId = null;
        }

        startTicking() {
            console.log('Clock started');
            this.tick();
            this.intervalId = setInterval(() => this.tick(), 1000);
        }

        stopTicking() {
            clearInterval(this.intervalId);
            this.intervalId = null;

            console.log('Clock stopped');
        }

        tick() {
            this.atom.reportChanged();
        }

        get() {
            this.atom.reportObserved();
            return new Date();
        }
    }

    const clock = new Clock();

    const disposer = autorun(() => {
        console.log(clock.get());
    });

    setTimeout(disposer, 3000);
});
