import { action, configure, flow, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const MultipleAwaitsExample = asComponent(() => {
    configure({ enforceActions: 'always' });

    class AuthStore {
        @observable loginState = '';

        @action.bound
        async login(username, password) {
            this.loginState = 'pending';

            await this.initializeEnvironment();

            this.loginState = 'initialized';

            await this.serverLogin(username, password);

            this.loginState = 'completed';

            await this.sendAnalytics();

            this.loginState = 'reported';
        }

        login2 = flow(function*(username, password) {
            this.loginState = 'pending';

            yield this.initializeEnvironment();

            this.loginState = 'initialized';

            yield this.serverLogin(username, password);

            this.loginState = 'completed';

            yield this.sendAnalytics();

            this.loginState = 'reported';

            yield this.delay(3000);
            console.log('Login completed and reported');
        });

        async initializeEnvironment() {}

        async serverLogin(username, password) {}

        async sendAnalytics() {}

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    const promise = new AuthStore().login2();
    // promise.cancel();

    configure({ enforceActions: 'never' });
});
