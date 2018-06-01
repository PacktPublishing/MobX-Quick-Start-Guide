import { observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const ObservableMapExample = asComponent(() => {
    // Create an Observable Map
    const twitterUserMap = observable.map();

    console.log(twitterUserMap.size); // Prints: 0

    // Add keys
    twitterUserMap.set('pavanpodila', 'Pavan Podila');
    twitterUserMap.set('mweststrate', 'Michel Weststrate');

    console.log(twitterUserMap.get('pavanpodila')); // Prints: Pavan Podila
    console.log(twitterUserMap.has('mweststrate')); // Prints: Michel Weststrate

    twitterUserMap.forEach((value, key) => console.log(`${key}: ${value}`));

    // Prints:
    // pavanpodila: Pavan Podila
    // mweststrate: Michel Weststrate
});
