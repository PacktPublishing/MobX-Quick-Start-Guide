import { observable, observe } from 'mobx';
import { asComponent } from '../core/as-component';

export const ObserveExample = asComponent(() => {
    const theme = observable({
        color: 'light',
        shades: [],
    });

    // eslint-disable-next-line
    const disposer = observe(theme, 'color', change => {
        console.log(
            `Observing ${change.type}`,
            change.oldValue,
            '-->',
            change.newValue,
            'on',
            change.object,
        );
    });

    theme.color = 'dark';
});
