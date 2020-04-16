const sheet = Symbol('sheet');

function CSSModulesMixin(Super) {
    return class CSSModules extends Super {
        constructor() {
            super();
            const { styles } = this.constructor;
            const hasStyles = styles && styles.length;
            if (!this.constructor[sheet] && hasStyles) {
                const ss = new CSSStyleSheet();
                const text = styles.map((url) => {
                    return `@import url("${url}");`;
                }).join('\n')
                ss.replace(text);
                this.constructor[sheet] = ss;
            }
            if(hasStyles){
                this.shadowRoot.adoptedStyleSheets = [this.constructor[sheet]];
            }
        }
    }
}

export { CSSModulesMixin };