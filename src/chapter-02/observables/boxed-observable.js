import { observable } from 'mobx';

const count = observable.box(20);

// Get the count
console.log(`Count is ${count.get()}`);

// Change count
count.set(22);
