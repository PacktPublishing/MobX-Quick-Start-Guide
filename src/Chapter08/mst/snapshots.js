import { reaction } from 'mobx';
import { getSnapshot, types } from 'mobx-state-tree';
import { asComponent } from '../../core/as-component';

import React from 'react';
import { Typography } from '@material-ui/core';

export const SnapshotExample = asComponent(() => {
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
        twitter: types.maybe(
            types.refinement(types.string, v => /^\w+$/.test(v)),
        ),
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

    reaction(
        () => getSnapshot(app),
        snapshot => {
            window.localStorage.setItem('app', JSON.stringify(snapshot));
            console.log('Generated snapshot: ', snapshot);
        },
        { delay: 1000 },
    );

    app.todos[0].toggle();

    return (
        <Typography variant={'subheading'}>
            Check your <i>localstorage</i> for the key: <strong>app</strong>.
            That contains the MST snapshot.
        </Typography>
    );
});
