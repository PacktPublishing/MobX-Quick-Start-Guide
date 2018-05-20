import React, { Fragment } from 'react';
import { inject, Observer, observer } from 'mobx-react';
import {
    Button,
    Grid,
    LinearProgress,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core/es/index';

@inject(stores => ({ store: stores.store }))
@observer
class UserEnrollmentForm extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <form>
                <Grid container direction={'column'}>
                    <CenteredGridItem>
                        <Typography variant={'title'}>Enroll User</Typography>
                    </CenteredGridItem>

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
                        <EnrollButton store={store} />
                    </CenteredGridItem>
                </Grid>
            </form>
        );
    }
}

const EnrollButton = observer(({ store }) => {
    const isEnrolling = store.enrollmentStatus === 'pending';
    const failed = store.enrollmentStatus === 'failed';

    return (
        <Fragment>
            <Button
                variant={'raised'}
                color={'primary'}
                style={{ marginTop: 20 }}
                disabled={isEnrolling}
                onClick={() => store.enroll()}
            >
                Enroll
                {isEnrolling ? (
                    <CircularProgress
                        style={{
                            color: 'white',
                            marginLeft: 10,
                        }}
                        size={20}
                        variant={'indeterminate'}
                    />
                ) : null}
            </Button>
            {failed ? (
                <Typography color={'secondary'} variant={'subheading'}>
                    Failed to enroll
                </Typography>
            ) : null}{' '}
        </Fragment>
    );
});

const EmailInputField = observer(({ store }) => {
    const { errors, validating } = store;
    const hasError = !!(errors && errors.email);

    return (
        <Fragment>
            <TextField
                fullWidth
                type={'text'}
                value={store.email}
                label={'Email'}
                error={hasError}
                helperText={hasError ? errors.email[0] : null}
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
    const errors = store.errors && store.errors[field];
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

@inject('store')
class EnrollmentComplete extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <CenteredGridItem>
                <Paper
                    elevation={2}
                    style={{ textAlign: 'center', padding: 20 }}
                >
                    <CheckCircle color={'primary'} />
                    <Typography variant={'headline'} color={'primary'}>
                        User Enrolled
                    </Typography>

                    <Button onClick={() => store.reset()}>
                        Back to Enroll
                    </Button>
                </Paper>
            </CenteredGridItem>
        );
    }
}

@inject('store')
@observer
export class App extends React.Component {
    render() {
        const { store } = this.props;
        return store.enrollmentStatus === 'completed' ? (
            <EnrollmentComplete />
        ) : (
            <UserEnrollmentForm />
        );
    }
}
