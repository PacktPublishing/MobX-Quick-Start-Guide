import { intercept, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const InterceptExample = asComponent(() => {
    const theme = observable({
        color: 'light',
        shades: [],
    });

    // eslint-disable-next-line
    const disposer = intercept(theme, 'color', change => {
        console.log('Intercepting:', change);

        // Cannot unset value, so discard this change
        if (!change.newValue) {
            return null;
        }

        // Handle shorthand values
        const newTheme = change.newValue.toLowerCase();
        if (newTheme === 'l' || newTheme === 'd') {
            change.newValue = newTheme === 'l' ? 'light' : 'dark'; // set the correct value
            return change;
        }

        // check for a valid theme
        const allowedThemes = ['light', 'dark'];
        const isAllowed = allowedThemes.includes(newTheme);
        if (!isAllowed) {
            throw new Error(`${change.newValue} is not a valid theme`);
        }

        return change; // Correct value so return as-is
    });

    theme.color = 'dark';
    theme.color = 'l';
    theme.color = undefined;
    // theme.color = 'darker';
});
