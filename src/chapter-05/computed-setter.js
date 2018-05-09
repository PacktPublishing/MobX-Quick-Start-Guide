import { observable, computed, decorate, comparer } from 'mobx';

class Contact {
    @observable firstName = '';
    @observable lastName = '';

    @computed
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(value) {
        const [firstName, lastName] = value.split(' ');

        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// decorate(Contact, {
//     fullName: computed({
//         // This doesn't work
//         set: function(value) {
//             const [firstName, lastName] = value.split(' ');
//
//             this.firstName = firstName;
//             this.last = lastName;
//         },
//         equals: comparer.identity,
//     }),
// });

const c = new Contact();

c.firstName = 'Pavan';
c.lastName = 'Podila';

console.log(c.fullName);

c.fullName = 'Michel Weststrate';
console.log(c.firstName, c.lastName);
