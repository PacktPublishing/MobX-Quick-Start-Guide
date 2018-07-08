import { types } from 'mobx-state-tree';

const Todo = types
    .model('Todo', {
        title: types.string,
        done: false,
    })
    .actions(self => ({
        toggle() {
            self.done = !self.done;
        },
    }))
    .views(self => ({
        get asMarkdown() {
            return self.done
                ? `* [x] ~~${self.title}~~`
                : `* [ ] ${self.title}`;
        },

        contains(text) {
            return self.title.indexOf(text) !== -1;
        },
    }));

const User = types.model('User', {
    name: types.string,
    age: 42,
    twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))),
});

const App = types.model('App', {
    todos: types.array(Todo),
    users: types.map(User),
});

const app = App.create({
    todos: [
        { title: 'Write the chapter', done: false },
        { title: 'Review the chapter', done: false },
    ],
    users: {
        michel: {
            name: 'Michel Westrate',
            twitter: 'mwestrate',
        },
        pavan: {
            name: 'Pavan Podila',
            twitter: 'pavanpodila',
        },
    },
});

app.todos[0].toggle();
