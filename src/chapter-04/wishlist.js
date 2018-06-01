import { action, computed, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const WishlistExample = asComponent(() => {
    class WishListStore {
        @observable.shallow lists = [];

        @computed
        get isEmpty() {
            return this.lists.length === 0;
        }

        @action
        addWishList(name) {
            this.lists.push(new WishList(name));
        }

        @action
        removeWishList(list) {
            this.lists.remove(list);
        }
    }

    class WishList {
        @observable name = '';
        @observable.shallow items = [];

        @computed
        get isEmpty() {
            return this.items.length === 0;
        }

        constructor(name) {
            this.name = name;
        }

        @action
        renameWishList(newName) {
            this.name = newName;
        }

        @action
        addItem(title) {
            this.items.push(new WishListItem(title));
        }

        @action
        removeItem(item) {
            this.items.remove(item);
        }
    }

    class WishListItem {
        @observable title = '';
        @observable purchased = false;

        constructor(title) {
            this.title = title;
        }
    }

    const store = new WishListStore();

    store.addWishList('hello');
    store.removeWishList(store.lists[0]);
    console.log(store.lists.length);
});
