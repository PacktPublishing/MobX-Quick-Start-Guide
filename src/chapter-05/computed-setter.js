import { computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ComputedSetterExample = asComponent(() => {
    // spy(event => {
    //     console.log(`${event.type}: ${event.name} with args: ${event.arguments}`);
    // });

    class Contact {
        @observable firstName = '';
        @observable lastName = '';

        @computed({
            name: 'Full name computation',
            // Option 1 for a setter
            // set(value) {
            //     const [firstName, lastName] = value.split(' ');
            //
            //     this.firstName = firstName;
            //     this.lastName = lastName;
            // },
        })
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }

        // Option 2 for a setter
        set fullName(value) {
            const [firstName, lastName] = value.split(' ');

            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

    // decorate(Contact, {
    //     fullName: computed({
    //         // Option 3 for a setter
    //         set: function(value) {
    //             const [firstName, lastName] = value.split(' ');
    //
    //             this.firstName = firstName;
    //             this.lastName = lastName;
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
});
