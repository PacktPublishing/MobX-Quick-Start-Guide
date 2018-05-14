import { autorun, reaction, when } from 'mobx';

const disposer1 = autorun(() => {
    /* effect function */
});

const disposer2 = reaction(
    () => {
        /* tracking function returning data */
    },
    data => {
        /* effect function */
    },
);

const disposer3 = when(
    () => {
        /* predicate function */
    },
    predicate => {
        /* effect function */
    },
);

// Dispose pre-maturely
disposer1();
disposer2();
disposer3();
