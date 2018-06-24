import React from 'react';

export function asComponent(fn) {
    return class ExampleComponent extends React.Component {
        render() {
            return fn() || null;
        }
    };
}
