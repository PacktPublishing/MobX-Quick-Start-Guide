import { types } from 'mobx-state-tree';

const User = types.model('User', {
    name: types.string,
    age: 42,
    twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))),
});
