export function checkUser(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject();
        }, Math.random() * 500);
    });
}

export function enrollUser(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.25 ? resolve() : reject();
        }, Math.random() * 1000);
    });
}
