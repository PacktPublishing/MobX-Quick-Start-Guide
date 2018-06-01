import { observable } from 'mobx';
import { asComponent } from '../../core/as-component';

export const CreateObservableExample = asComponent(() => {
    const item = observable({
        name: 'Party Balloons',
        itemId: '1234',
        quantity: 2,
        price: 10,
        coupon: {
            code: 'BIGPARTY',
            discountPercent: 50,
        },
    });

    // Set values
    item.quantity += 3;
    item.name = 'Small Balloons';

    // Get values
    console.log(`Buying ${item.quantity} of ${item.name}`);
});
