import { onPatch } from 'mobx-state-tree';

const app = App.create(/* see above */);

onPatch(app, (patches, inversePatches) => {
    console.dir(patches, inversePatches);
});

app.todos[0].toggle();
/*

// prints:

    [{
    op: "replace",
    path: "/todos/0/done",
    value: true
}]

// inverse patch:

    [{
    op: "replace",
    path: "/todos/0/done",
    value: false
}]

*/
