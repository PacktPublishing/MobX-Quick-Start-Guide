import { searchBooks } from './goodreads.service';
import { observable, action, computed } from 'mobx';

class SearchStore {
    @observable term = 'javascript';
    @observable state = '';
    @observable.shallow results = [];

    @computed
    get isEmpty() {
        return this.results.length === 0 && this.state === 'completed';
    }

    @action.bound
    setTerm(value) {
        this.term = value;
    }

    @action.bound
    async search() {
        try {
            this.state = 'pending';
            this.results = await searchBooks(this.term);

            this.state = 'completed';
        } catch (e) {
            this.state = 'failed';
        }
    }
}

class BookStore {
    search = new SearchStore();

    constructor() {
        this.search.search();
    }
}

export const store = new BookStore();
