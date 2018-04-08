import { searchBooks } from './goodreads.service';
import { observable, action, computed } from 'mobx';

class BookStore {
    @observable searchText = 'javascript';
    @observable searchOperation = ''; // pending | completed | failed

    @observable.shallow searchResults = [];

    @computed
    get isSearchEmpty() {
        return this.searchResults.length === 0;
    }

    constructor() {
        this.search();
    }

    @action.bound
    setSearchText(value) {
        this.searchText = value;
    }

    @action.bound
    async search() {
        try {
            this.searchOperation = 'pending';
            this.searchResults = await searchBooks(this.searchText);
            this.searchOperation = 'completed';
        } catch (e) {
            this.searchOperation = 'failed';
        }
    }
}

export const store = new BookStore();
