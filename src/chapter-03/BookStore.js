import { searchBooks } from './goodreads.service';
import { observable, action, computed, runInAction } from 'mobx';

class BookSearchStore {
    @observable term = 'javascript';
    @observable state = '';
    @observable.shallow results = [];

    @computed
    get isEmpty() {
        return this.results.length === 0 && this.state === 'completed';
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
            const results = await searchBooks(this.term);

            runInAction(() => {
                this.results = results;
                this.state = 'completed';
            });
        } catch (e) {
            this.state = 'failed';
        }
    }
}
export const store = new BookSearchStore();
