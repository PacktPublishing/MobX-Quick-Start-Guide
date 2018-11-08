import { action, configure, flow, observable, reaction } from 'mobx';
import Validate from 'validate.js';
import { checkUser, enrollUser } from './service';

configure({ enforceActions: 'always' });

Validate.validators.checkUser = async function(value) {
    try {
        await checkUser(value);
        return null;
    } catch (e) {
        return 'Email already in use';
    }
};

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
        presence: { allowEmpty: false },
        email: true,
        checkUser: true,
    },
};

export class UserEnrollmentData {
    @observable email = '';
    @observable password = '';
    @observable firstName = '';
    @observable lastName = '';

    @observable validating = false;
    @observable.ref errors = null;

    @observable enrollmentStatus = 'none';

    disposeValidation = null;

    constructor() {
        this.setupValidation();
    }

    setupValidation() {
        this.disposeValidation = reaction(
            () => {
                const { firstName, lastName, password, email } = this;
                return { firstName, lastName, password, email };
            },
            fields => {
                this.validateFields(fields);
            },
        );
    }

    @action
    setField(field, value) {
        this[field] = value;
    }

    getFields() {
        const { firstName, lastName, password, email } = this;
        return { firstName, lastName, password, email };
    }

    validateFields = flow(function*(fields) {
        this.validating = true;
        this.errors = null;

        try {
            yield Validate.async(fields, rules);

            this.errors = null;
        } catch (err) {
            this.errors = err;
        } finally {
            this.validating = false;
        }
    });

    enroll = flow(function*() {
        this.enrollmentStatus = 'pending';
        try {
            // Validation
            const fields = this.getFields();
            yield this.validateFields(fields);
            if (this.errors) {
                throw new Error('Invalid fields');
            }

            // Enrollment
            yield enrollUser(fields);

            this.enrollmentStatus = 'completed';
        } catch (e) {
            this.enrollmentStatus = 'failed';
        }
    });

    @action
    reset() {
        this.enrollmentStatus = 'none';
    }

    cleanup() {
        this.disposeValidation();
    }
}

configure({
    enforceActions: 'never',
});
