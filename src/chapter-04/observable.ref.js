import { action, observable } from 'mobx';

class FormData {
    @observable.ref validations = null;

    @observable username = '';
    @observable password = '';

    @observable
    @action
    validate() {
        const { username, password } = this;
        this.validations = this.applyValidations({ username, password });
    }

    applyValidations(obj) {
        return null;
    }
}
