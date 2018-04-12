import { searchBooks } from './goodreads.service';
import { observable, action, computed, runInAction } from 'mobx';

const searchState = observable({
    term: '',
    state: '',
    results: [],
    totalCount: 0,
});

class BookSearchStore {
    @observable term = 'javascript';
    @observable state = '';
    @observable.shallow results = [];

    @observable totalCount = 0;

    @computed
    get isEmpty() {
        return this.results.length === 0;
    }

    constructor() {
        this.search();
    }

    @action.bound
    setTerm(value) {
        this.term = value;
    }

    @action.bound
    async search() {
        try {
            this.state = 'pending';
            const result = await searchBooks(this.term);

            runInAction(() => {
                this.totalCount = result.total;
                this.results = result.items;
                this.state = 'completed';
            });
        } catch (e) {
            this.state = 'failed';
            console.log(e);
        }
    }
}
export const store = new BookSearchStore();
