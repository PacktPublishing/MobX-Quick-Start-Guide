import { action, autorun, computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const ComputedExample = asComponent(() => {
    class Todo {
        @observable title = '';
        @observable done = false;

        constructor(title) {
            this.title = title;
        }
    }

    class TodoList {
        @observable.shallow todos = [];

        @computed
        get pendingTodos() {
            return this.todos.filter(x => x.done === false);
        }

        @computed
        get completedTodos() {
            return this.todos.filter(x => x.done);
        }

        @computed
        get pendingTodosDescription() {
            const count = this.pendingTodos.length;
            return `${count} ${count === 1 ? 'todo' : 'todos'} remaining`;
        }

        @action
        addTodo(title) {
            const todo = new Todo(title);
            this.todos.push(todo);
        }
    }

    class TodoManager {
        list = null;

        @observable filter = 'all'; // all, pending, completed
        @observable title = '';

        constructor(list) {
            this.list = list;

            autorun(() => {
                console.log(this.list.pendingTodos.length);
            });
        }

        @computed
        get visibleTodos() {
            switch (this.filter) {
                case 'pending':
                    return this.list.pendingTodos;
                case 'completed':
                    return this.list.completedTodos;
                default:
                    return this.list.todos;
            }
        }
    }

    const list = new TodoList();

    const mgr = new TodoManager(list);

    list.addTodo('hello');
});
