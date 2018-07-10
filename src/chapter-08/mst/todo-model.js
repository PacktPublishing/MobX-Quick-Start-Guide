import { types } from 'mobx-state-tree';
import { autorun } from 'mobx';
import { asComponent } from '../../core/as-component';

export const TodoExample = asComponent(() => {
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

    const todo = Todo.create({
        title: 'Read a book',
        done: false,
    });

    autorun(() => {
        console.log(`${todo.title}: ${todo.done}`);
        console.log(`Title contains "book"?: ${todo.contains('book')}`);
    });

    // Toggle the done flag
    // todo.done = !todo.done;
    // Error: [mobx-state-tree] Cannot modify 'Todo@<root>', the object is protected and can only be modified by using an action.

    todo.toggle();

    console.log(todo.asMarkdown);
    console.log(todo.contains('book'));
});
