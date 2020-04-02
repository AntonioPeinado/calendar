function RefsMixin(Super) {
    return class Refs extends Super {
        constructor() {
            super();
            this.$ = {};
        }
        connectedCallback() {
            super.connectedCallback();
            this.shadowRoot.querySelectorAll('[id]').forEach((el) => {
                this.$[el.id] = el;
            });
        }
    }
}

export {RefsMixin};