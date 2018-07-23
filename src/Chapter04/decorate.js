import { action, computed, decorate, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const DecorateExample = asComponent(() => {
    class BookSearchStore {
        term = 'javascript';
        status = '';
        results = [];

        totalCount = 0;

        get isEmpty() {
            return this.results.length === 0;
        }

        setTerm(value) {
            this.term = value;
        }

        async search() {}
    }

    decorate(BookSearchStore, {
        term: observable,
        status: observable,
        results: observable.shallow,
        totalCount: observable,

        isEmpty: computed,
        setTerm: action.bound,
        search: action.bound,
    });

    const store = new BookSearchStore();

    console.log(store.isEmpty);
});
