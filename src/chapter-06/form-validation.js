import { action, configure, observable, reaction, runInAction } from 'mobx';
import Validate from 'validate.js';
import React, { Fragment } from 'react';
import { observer, Provider, inject } from 'mobx-react';
import ReactDOM from 'react-dom';
import {
    Grid,
    LinearProgress,
    TextField,
    Button,
    Typography,
} from '@material-ui/core';

configure({ enforceActions: 'strict' });

function checkUser(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject();
        }, Math.random() * 500);
    });
}

const rules = {
    firstName: {
        presence: { allowEmpty: false },
    },
    lastName: {
        presence: { allowEmpty: false },
    },
    password: {
        presence: { allowEmpty: false },

        length: { minimum: 3 },
    },
    email: {
        email: true,
    },
};

class UserEnrollmentData {
    @observable email = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable password = '';

    @observable
    emailValidation = {
        status: '',
        error: null,
    };
    @observable.ref validation = null;

    @observable enrollmentStatus = '';

    constructor() {
        reaction(
            () => this.email,
            email => {
                this.validateEmail();
            },
        );

        reaction(
            () => {
                const { firstName, lastName, password } = this;
                return { firstName, lastName, password };
            },
            () => {
                this.validateFields();
            },
        );
    }

    @action
    setField(field, value) {
        this[field] = value;
    }

    @action
    async validateEmail() {
        this.emailValidation.status = 'pending';
        try {
            const result = Validate.single(this.email, { email: true });
            if (result) {
                throw new Error('invalid');
            }

            await checkUser(this.email);
            runInAction(() => {
                this.emailValidation.status = 'completed';
            });
        } catch (e) {
            runInAction(() => {
                this.emailValidation.error =
                    e && e.message === 'invalid'
                        ? 'Invalid Email'
                        : 'Email already in use';
                this.emailValidation.status = 'failed';
            });
        }
    }

    @action
    validateFields() {
        const { firstName, lastName, password } = this;
        this.validation = Validate.validate(
            { firstName, lastName, password },
            rules,
        );
    }

    @action
    async enroll() {
        this.enrollmentStatus = 'pending';
        try {
            await this.validateEmail();
            if (this.validateFields()) {
                throw new Error();
            }
            runInAction(() => {
                this.enrollmentStatus = 'completed';
            });
        } catch (e) {
            runInAction(() => {
                this.enrollmentStatus = 'failed';
            });
        }
    }
}

const enrollment = new UserEnrollmentData();

@inject(stores => ({ store: stores.store }))
@observer
class UserEnrollmentForm extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <form>
                <Grid container direction={'column'}>
                    <CenteredGridItem>
                        <EmailInputField store={store} />
                    </CenteredGridItem>
                    <CenteredGridItem>
                        <InputField
                            type={'text'}
                            field={'firstName'}
                            label={'First Name'}
                            store={store}
                        />
                    </CenteredGridItem>
                    <CenteredGridItem>
                        <InputField
                            type={'text'}
                            field={'lastName'}
                            label={'Last Name'}
                            store={store}
                        />
                    </CenteredGridItem>
                    <CenteredGridItem>
                        <InputField
                            type={'password'}
                            field={'password'}
                            label={'Password'}
                            store={store}
                        />
                    </CenteredGridItem>

                    <CenteredGridItem>
                        <Button
                            variant={'raised'}
                            color={'primary'}
                            style={{ marginTop: 20 }}
                            onClick={() => store.enroll()}
                        >
                            Enroll
                        </Button>
                    </CenteredGridItem>
                </Grid>
            </form>
        );
    }
}

const EmailInputField = observer(({ store }) => {
    const { emailValidation } = store;
    const validating = emailValidation.status === 'pending';
    const hasError = emailValidation.status === 'failed';

    return (
        <Fragment>
            <TextField
                fullWidth
                type={'text'}
                value={store.email}
                label={'Email'}
                error={hasError}
                helperText={hasError ? emailValidation.error : null}
                onChange={event => store.setField('email', event.target.value)}
                margin={'normal'}
            />
            {validating ? <LinearProgress variant={'query'} /> : null}
        </Fragment>
    );
});

function CenteredGridItem({ children }) {
    return (
        <Grid container justify={'center'}>
            <Grid item xs={6}>
                {children}
            </Grid>
        </Grid>
    );
}
const InputField = observer(({ store, field, label, type }) => {
    const errors = store.validation && store.validation[field];
    const hasError = !!errors;
    return (
        <TextField
            fullWidth
            type={type}
            value={store[field]}
            label={label}
            error={hasError}
            onChange={event => store.setField(field, event.target.value)}
            margin={'normal'}
            helperText={errors ? errors[0] : null}
        />
    );
});

function EnrollmentComplete() {
    return (
        <Card>
            <Typography variant={'headline'}>User Enrolled</Typography>
        </Card>
    );
}

@observer
class App extends React.Component {
    render() {
        return (
            <Provider store={enrollment}>
                {enrollment.enrollmentStatus === 'completed' ? (
                    <EnrollmentComplete />
                ) : (
                    <UserEnrollmentForm />
                )}
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
