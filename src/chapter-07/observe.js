import { observe, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ObserveExample = asComponent(() => {
    const theme = observable({
        color: 'light',
        shades: [],
    });

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
