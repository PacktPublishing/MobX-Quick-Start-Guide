import { createAtom, autorun } from 'mobx';

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
        this.time = new Date();
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
        this.time = new Date();
        this.atom.reportChanged();
    }

    get() {
        this.atom.reportObserved();
        return this.time;
    }
}

const clock = new Clock();

const disposer = autorun(() => {
    console.log(clock.get());
});

setTimeout(disposer, 3000);
