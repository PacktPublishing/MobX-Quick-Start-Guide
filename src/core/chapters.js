import {
    ActionDecoratorExample,
    AutorunExample,
    BasicActionExample,
    BoxedObservableExample,
    ComputedPropertiesExample,
    CreateObservableExample,
    EnforcingActionsExample,
    ObservableArrayExample,
    ObservableMapExample,
    ReactionExample,
    WhenExample,
    WhenWithPromiseExample,
} from '../chapter-02';
import { BookSearchExample } from '../chapter-03';
import {
    ComputedDecoratorExample,
    ComputedEqualityExample,
    DecorateExample,
    ExtendObservableExample,
    ObservableDecorateExample,
    ObservableRefExample,
    ObservableStructExample,
    WishlistExample,
} from '../chapter-04';
import {
    AsyncActionExample,
    AutorunWithOptionsExample,
    ComputedErrorExample,
    ComputedExample,
    ComputedSetterExample,
    MultipleAwaitsExample,
    ReactionsExample,
    RunInActionExample,
    WhenToReactExample,
} from '../chapter-05';
import { FormValidationExample, PageRoutingExample } from '../chapter-06';
import {
    AtomExample,
    InfiniteReactionExample,
    ObservableValueExample,
    ShoppingCartExample,
} from '../chapter-09';
import {
    ObjectAPIExample,
    ToJSExample,
    BecomeObservedExample,
    LazyTemperatureExample,
} from '../chapter-07';

export const chapters = applyPathPrefix([
    {
        chapter: 2,
        title: 'Observables, Actions and Reactions',
        examples: [
            {
                title: 'Boxed Observables',
                path: '/boxed',
                component: BoxedObservableExample,
            },
            {
                title: 'Computed Properties',
                path: '/computed',
                component: ComputedPropertiesExample,
            },
            {
                title: 'Create Observable',
                path: '/create-observable',
                component: CreateObservableExample,
            },
            {
                title: 'Observable Map',
                path: '/observable-map',
                component: ObservableMapExample,
            },
            {
                title: 'Observable Array',
                path: '/observable-array',
                component: ObservableArrayExample,
            },
            {
                title: 'Enforcing Actions',
                path: '/enforcing-actions',
                component: EnforcingActionsExample,
            },
            {
                title: 'Action Decorators',
                path: '/action-decorators',
                component: ActionDecoratorExample,
            },
            {
                title: 'Basic Action',
                path: '/basic-action',
                component: BasicActionExample,
            },
            {
                title: 'Autorun',
                path: '/autorun',
                component: AutorunExample,
            },
            {
                title: 'Reaction',
                path: '/reaction',
                component: ReactionExample,
            },
            {
                title: 'When',
                path: '/when',
                component: WhenExample,
            },
            {
                title: 'When with Promise',
                path: '/promise-when',
                component: WhenWithPromiseExample,
            },
        ],
    },
    {
        chapter: 3,
        title: 'A React App with MobX',
        examples: [
            {
                title: 'Book Search with Goodreads',
                path: '/',
                component: BookSearchExample,
            },
        ],
    },
    {
        chapter: 4,
        title: 'Crafting the Observable tree',
        examples: [
            {
                title: 'Computed Decorator',
                path: '/computed-decorator',
                component: ComputedDecoratorExample,
            },
            {
                title: 'Computed Equality',
                path: '/computed-equality',
                component: ComputedEqualityExample,
            },
            {
                title: 'Decorate',
                path: '/decorate',
                component: DecorateExample,
            },
            {
                title: 'Extend Observable',
                path: '/extend-observable',
                component: ExtendObservableExample,
            },
            {
                title: 'Observable Decorators',
                path: '/observable-decorators',
                component: ObservableDecorateExample,
            },
            {
                title: 'Observable Ref',
                path: '/observable-ref',
                component: ObservableRefExample,
            },
            {
                title: 'Observable Struct',
                path: '/observable-struct',
                component: ObservableStructExample,
            },
            {
                title: 'Wishlist',
                path: '/wishlist',
                component: WishlistExample,
            },
        ],
    },
    {
        chapter: 5,
        title: 'Derivations, Actions and Reactions',
        examples: [
            {
                title: 'Async Action',
                path: '/async-action',
                component: AsyncActionExample,
            },
            {
                title: 'Autorun with Options',
                path: '/autorun-with-options',
                component: AutorunWithOptionsExample,
            },
            {
                title: 'Computed',
                path: '/computed',
                component: ComputedExample,
            },
            {
                title: 'Computed Error',
                path: '/computed-error',
                component: ComputedErrorExample,
            },
            {
                title: 'Computed Setter',
                path: '/computed-setter',
                component: ComputedSetterExample,
            },
            {
                title: 'Multiple Awaits',
                path: '/multiple-awaits',
                component: MultipleAwaitsExample,
            },
            {
                title: 'Reactions',
                path: '/reactions',
                component: ReactionsExample,
            },
            {
                title: 'Run In Action',
                path: '/run-in-action',
                component: RunInActionExample,
            },
            {
                title: 'When to React',
                path: '/when-to-react',
                component: WhenToReactExample,
            },
        ],
    },
    {
        chapter: 6,
        title: 'Handling Real World use cases',
        examples: [
            {
                title: 'Form Validation',
                path: '/form',
                component: FormValidationExample,
            },
            {
                title: 'Page Routing',
                path: '/routing',
                component: PageRoutingExample,
            },
        ],
    },
    {
        chapter: 7,
        title: 'Special APIs for special cases',
        examples: [
            {
                title: 'Object API',
                path: '/object-api',
                component: ObjectAPIExample,
            },
            {
                title: 'toJS()',
                path: '/to-js',
                component: ToJSExample,
            },
            {
                title: 'onBecomeObserved() and onBecomeUnobserved()',
                path: '/become-observed',
                component: BecomeObservedExample,
            },
            {
                title: 'Lazy Temperature',
                path: '/lazy-temp',
                component: LazyTemperatureExample,
            },
        ],
    },
    {
        chapter: 8,
        title: 'MobX Utils and MobX-State-Tree',
        examples: [
            {
                title: 'Utils',
                path: '/',
                component: () => null,
            },
        ],
    },
    {
        chapter: 9,
        title: 'MobX Internals',
        examples: [
            {
                title: 'Atomic Clock',
                path: '/atom',
                component: AtomExample,
            },
            {
                title: 'Shopping Cart',
                path: '/cart',
                component: ShoppingCartExample,
            },
            {
                title: 'ObservableValue',
                path: '/observable-value',
                component: ObservableValueExample,
            },
            {
                title: 'Infinite Reaction',
                path: '/infinite-reaction',
                component: InfiniteReactionExample,
            },
        ],
    },
]);

export const allExamples = chapters.reduce((list, ch) => {
    return list.concat(ch.examples);
}, []);

function applyPathPrefix(chapters) {
    return chapters.map(ch => {
        ch.examples.forEach(ex => {
            const exPath = ex.path.replace(/^\/+/, '');
            Object.assign(ex, {
                path: `/ch0${ch.chapter}/${exPath}`,
                chapterIndex: ch.chapter,
                chapterTitle: ch.title,
            });
        });

        return ch;
    });
}
