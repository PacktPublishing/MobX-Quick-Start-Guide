import { types, getRoot } from 'mobx-state-tree';

const User = types.model('User', {
    userid: types.string, // uniquely identifies this User
    name: types.string,
    age: 42,
    twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))),
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

const App = {
    /* as is */
};

const app = App.create(/* ... */);

console.log(app.todos[0].getAssignee.name); // Michel Weststrate
