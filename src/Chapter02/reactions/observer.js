import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ReactDOM from 'react-dom';
import React from 'react';
import { asComponent } from '../../core/as-component';

export const ObserverExample = asComponent(() => {
    const item = observable.box(30);

    const ItemComponent = observer(() => {
        return <h1>Current Item Value = {item.get()}</h1>;
    });

    ReactDOM.render(<ItemComponent />, document.getElementById('root'));

    setTimeout(() => item.set(50), 2000);
});
