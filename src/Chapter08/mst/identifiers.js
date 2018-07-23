import { types } from 'mobx-state-tree';
import { asComponent } from '../../core/as-component';

export const IdentifiersExample = asComponent(() => {
    const User = types.model('User', {
        userid: types.identifier(), // uniquely identifies this User
        name: types.string,
        age: 42,
        twitter: types.maybe(
            types.refinement(types.string, v => /^\w+$/.test(v)),
        ),
    });

    const Todo = types.model('Todo', {
        assignee: types.maybe(types.reference(User)), // a Todo can be assigned to a User
        title: types.string,
        done: false,
    });

    const App = types.model('App', {
        todos: types.array(Todo),
        users: types.map(User),
    });

    const app = App.create({
        todos: [
            {
                title: 'Learn MST',
                done: false,
                assignee: '37',
            },
        ],
        users: {
            '37': {
                userid: '37',
                name: 'Michel Weststrate',
                age: 33,
                twitter: 'mweststrate',
            },
        },
    });

    console.log(app.todos[0].assignee.name); // Michel Weststrate
});
