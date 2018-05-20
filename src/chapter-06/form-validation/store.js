import { action, configure, flow, observable, reaction } from 'mobx';
import Validate from 'validate.js';
import { checkUser, enrollUser } from './service';

configure({ enforceActions: 'strict' });

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

class UserEnrollmentData {
    @observable email = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable password = '';

    @observable validating = false;
    @observable.ref errors = null;

    @observable enrollmentStatus = '';

    constructor() {
        reaction(
            () => {
                const { firstName, lastName, password, email } = this;
                return { firstName, lastName, password, email };
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

    validateFields = flow(function*() {
        this.validating = true;
        this.errors = null;

        const { firstName, lastName, password, email } = this;
        try {
            yield Validate.async(
                { firstName, lastName, password, email },
                rules,
            );

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
            yield this.validateFields();
            if (this.errors) {
                throw new Error();
            }

            // Enrollment
            const { firstName, lastName, email, password } = this;
            yield enrollUser({ firstName, lastName, email, password });

            this.enrollmentStatus = 'completed';
        } catch (e) {
            this.enrollmentStatus = 'failed';
        }
    });

    @action
    reset() {
        this.enrollmentStatus = '';
    }
}

export const enrollment = new UserEnrollmentData();
