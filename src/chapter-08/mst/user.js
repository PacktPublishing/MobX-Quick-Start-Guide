import { types } from 'mobx-state-tree';
import { asComponent } from '../../core/as-component';

export const UserExample = asComponent(() => {
    const User = types.model('User', {
        name: types.string,
        age: 42,
        twitter: types.maybe(
            types.refinement(types.string, v => /^\w+$/.test(v)),
        ),
    });

    const user = User.create({
        name: 'Pavan Podila',
        twitter: 'pavanpodila',
    });

    console.log('Simple user:', user);
});
