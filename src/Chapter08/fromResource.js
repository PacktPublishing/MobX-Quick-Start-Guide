import { fromResource } from 'mobx-utils';

import { asComponent } from '../core/as-component';

export const FromResourceExample = asComponent(() => {
    class WebSocketConnection {
        subscribe(channel) {
            /* ... */
        }

        unsubscribe(channel) {
            /* ... */
        }

        async get() {
            return '42';
        }
    }

    class DataService {
        data = null;
        socket = null;

        constructor() {
            this.data = fromResource(
                async sink => {
                    this.socket = new WebSocketConnection();
                    await this.socket.subscribe('data');

                    const result = await this.socket.get();

                    sink(result);
                },
                () => {
                    this.socket.unsubscribe('data');
                    this.socket = null;
                },
            );
        }
    }

    const service = new DataService();
    console.log(service.data.current());

    // After some time, when no longer needed
    service.data.dispose();
});
