import {
    observable,
    onBecomeObserved,
    onBecomeUnobserved,
    flow,
    autorun,
} from 'mobx';
import { asComponent } from '../core/as-component';

export const LazyTemperatureExample = asComponent(() => {
    const temperatureService = {
        fetch(location) {
            console.log('Invoked temperature-fetch');

            return new Promise(resolve =>
                setTimeout(resolve(Math.round(Math.random() * 35)), 200),
            );
        },
    };

    class City {
        @observable temperature;
        @observable location;

        interval = null;

        constructor(location) {
            this.location = location;
            onBecomeObserved(this, 'temperature', this.onActivated);
            onBecomeUnobserved(this, 'temperature', this.onDeactivated);
        }

        onActivated = () => {
            this.interval = setInterval(() => this.fetchTemperature(), 5000);
            console.log('Temperature activated');
        };

        onDeactivated = () => {
            console.log('Temperature deactivated');
            this.temperature = undefined;
            clearInterval(this.interval);
        };

        fetchTemperature = flow(function*() {
            this.temperature = yield temperatureService.fetch(this.location);
        });
    }

    const city = new City('Bengaluru');
    const disposer = autorun(() =>
        console.log(`Temperature in ${city.location} is ${city.temperature}ºC`),
    );

    setTimeout(disposer, 15000);
});

/*
Temperature activated
Temperature in Bengaluru is undefinedºC

Invoked temperature-fetch
Temperature in Bengaluru is 22ºC
Invoked temperature-fetch
Temperature in Bengaluru is 32ºC
Invoked temperature-fetch
Temperature in Bengaluru is 4ºC

Temperature deactivated
 */
