import { computed, decorate, observable, autorun, action } from 'mobx';

class Todo {
    @observable title = '';
    @observable done = false;

    constructor(title) {
        this.title = title;
    }
}

class TodoList {
    @observable.shallow todos = [];
    get pendingTodos() {
        return this.todos.filter(x => x.done === false);
    }

    get completedTodos() {
        return this.todos.filter(x => x.done);
    }

    @action
    addTodo(title) {
        const todo = new Todo(title);
        this.todos.push(todo);
    }
}
decorate(TodoList, {
    pendingTodos: computed({ name: 'pending-todos' }),
});

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
