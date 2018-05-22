import createHashHistory from 'history/createHashHistory';
import { observable, action } from 'mobx';

class HistoryTracker {
    unsubscribe = null;
    history = createHashHistory();

    @observable currentRoute = null;

    startListening(routes) {
        this.routes = routes;
        this.unsubscribe = this.history.listen(location => {
            this.identifyRoute(location);
        });

        this.identifyRoute(this.history.location);
    }

    stopListening() {
        this.unsubscribe && this.unsubscribe();
    }

    @action
    changeRoute(key) {
        if (!this.routes[key]) {
            throw new Error(`Invalid Route Key: ${key}`);
        }

        const path = this.routes[key].path;
        this.history.push(path);
    }

    @action
    identifyRoute(location) {
        const { pathname } = location;
        const routes = this.routes;

        this.currentRoute = Object.keys(routes).find(key => {
            const { path } = routes[key];
            return path.startsWith(pathname);
        });
    }
}

export const tracker = new HistoryTracker();
