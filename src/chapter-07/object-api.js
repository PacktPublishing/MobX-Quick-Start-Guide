import {
    autorun,
    entries,
    get,
    has,
    keys,
    observable,
    remove,
    runInAction,
    set,
    toJS,
    values,
} from 'mobx';
import { asComponent } from '../core/as-component';

export const ObjectAPIExample = asComponent(() => {
    class Todo {
        @observable description = '';
        @observable done = false;

        constructor(description) {
            this.description = description;
        }
    }

    const firstTodo = new Todo('Write Chapter');
    const todos = observable.array([firstTodo]);

    // eslint-disable-next-line
    const todosMap = observable.map({
        'Write Chapter': firstTodo,
    });

    // Reactions to track changes
    autorun(() => {
        console.log(`metadata present: ${has(firstTodo, 'metadata')}`);
        console.log(get(firstTodo, 'metadata'), get(firstTodo, 'user'));
        console.log(keys(firstTodo));
    });
    autorun(() => {
        // Arrays
        const secondTodo = get(todos, 1);
        console.log('Second Todo:', toJS(secondTodo));
        console.log(values(todos), entries(todos));
    });

    // Granular changes
    runInAction(() => {
        set(firstTodo, 'metadata', 'new Metadata');
        set(firstTodo, { metadata: 'meta update', user: 'Pavan Podila' });
        set(todos, 1, new Todo('Get it reviewed'));
    });

    runInAction(() => {
        remove(firstTodo, 'metadata');
        remove(todos, 1);
    });
});

/*
Console output:

metadata present: false
undefined undefined
(2) ["description", "done"]
Second Todo: undefined
[Todo] [Array(2)]

metadata present: true
meta update Pavan Podila
(4) ["description", "done", "metadata", "user"]
Second Todo: {description: "Get it reviewed", done: false}
(2) [Todo, Todo] (2) [Array(2), Array(2)]

metadata present: false
undefined "Pavan Podila"
(3) ["description", "done", "user"]
Second Todo: undefined
[Todo] [Array(2)]
 */
