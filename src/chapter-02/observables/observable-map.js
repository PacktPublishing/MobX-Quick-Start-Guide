import { observable } from 'mobx';

// Create an Observable Map
const book = observable.map();

console.log(book.size); // Prints: 0

// Add keys
book.set('name', 'MobX QuickStart Guide');
book.set('year', 2018);

console.log(book.get('name')); // Prints: MobX QuickStart Guide
console.log(book.has('id')); // Prints: false

book.forEach((value, key) => console.log(`${key}: ${value}`));

// Prints:
// name: MobX QuickStart Guide
// year: 2018
