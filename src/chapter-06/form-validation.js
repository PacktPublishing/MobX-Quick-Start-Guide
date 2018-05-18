import { observable, action, reaction } from 'mobx';
import Validate from 'validate.js';

function checkUser(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject();
        }, Math.random() * 500);
    });
}

const rules = {
    firstName: {
        presence: true,
    },
    lastName: {
        presence: true,
    },
    password: {
        presence: true,
    },
};

class UserEnrollmentFormData {
    @observable email = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable password = '';

    @observable emailValidation = '';

    constructor() {
        reaction(
            () => this.email,
            email => {
                this.validateEmail();
            },
        );
    }

    @action
    setField(field, value) {
        this[field] = value;
    }

    async validateEmail() {
        this.emailValidation = 'pending';
        try {
            await checkUser(this.email);
            this.emailValidation = 'completed';
        } catch (e) {
            this.emailValidation = 'failed';
        }
    }

    async validateFields() {}
}
