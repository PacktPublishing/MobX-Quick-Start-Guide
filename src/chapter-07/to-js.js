import { observable, toJS } from 'mobx';
import { asComponent } from '../core/as-component';

export const ToJSExample = asComponent(() => {
    const number = observable.box(10);
    const cart = observable({
        items: [{ title: 'milk', quantity: 2 }, { title: 'eggs', quantity: 3 }],
    });

    console.log(toJS(number));

    console.log('MobX type:', cart);
    console.log('JS type:', toJS(cart));
});

/*
Console output:

10
MobX type: Proxy {Symbol(mobx administration): ObservableObjectAdministration$$1}
JS type: {items: Array(2)}
 */
