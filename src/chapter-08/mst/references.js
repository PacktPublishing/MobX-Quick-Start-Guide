import { getRoot, types } from 'mobx-state-tree';
import { asComponent } from '../../core/as-component';

export const ReferencesExample = asComponent(() => {
    const User = types.model('User', {
        userid: types.string, // uniquely identifies this User
        name: types.string,
        age: 42,
        twitter: types.maybe(
            types.refinement(types.string, v => /^\w+$/.test(v)),
        ),
    });

    const Todo = types
        .model('Todo', {
            assignee: types.string, // represents a User
            title: types.string,
            done: false,
        })
        .views(self => ({
            getAssignee() {
                if (!this.assignee) return undefined;
                return getRoot(self).users.get(this.assignee);
            },
        }))
        .actions(self => ({
            setAssignee(user) {
                if (typeof user === 'string') this.assignee = user;
                else if (User.is(user)) this.assignee = user.userid;
                else throw new Error('Not a valid user object or user id');
            },
        }));

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

    console.log(app.todos[0].getAssignee().name); // Michel Weststrate
});
