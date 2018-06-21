import { asComponent } from '../core/as-component';
import { spy } from 'mobx';

const disposer = spy(event => console.log(event));

setTimeout(disposer, 5000);

export const SpyExample = asComponent(() => {});

/*
{type: "action", name: "<unnamed action>", object: undefined, arguments: Array(0), spyReportStart: true}
{type: "update", object: BookSearchStore, oldValue: 0, name: "BookSearchStore@1", newValue: 2179, …}
{spyReportEnd: true}
{object: Proxy, type: "splice", index: 0, removed: Array(0), added: Array(20), …}
{spyReportEnd: true}
{type: "update", object: BookSearchStore, oldValue: Proxy, name: "BookSearchStore@1", newValue: Proxy, …}
{spyReportEnd: true}
{type: "update", object: BookSearchStore, oldValue: "pending", name: "BookSearchStore@1", newValue: "completed", …}
 */
