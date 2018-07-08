import { reaction } from 'mobx';
import { getSnapshot } from 'mobx-state-tree';

const app = App.create(/* as before */);

reaction(
    () => getSnapshot(app),
    snapshot => {
        window.localStorage.setItem('app', JSON.stringify(snapshot));
    },
    { delay: 1000 },
);
