import { action, observable } from 'mobx';

class FormData {
    @observable.ref validations = null;

    @observable username = '';
    @observable password = '';

    @action
    validate() {
        const { username, password } = this;
        this.validations = this.applyValidations({ username, password });
    }

    applyValidations(obj) {
        return null;
    }
}
