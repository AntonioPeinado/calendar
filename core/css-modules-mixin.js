const sheet = Symbol('sheet');

function CSSModulesMixin(Super) {
    return class CSSModules extends Super {
        constructor() {
            super();
            // const styles = this.constructor.styles;
            // saco los estilos de la variable estatica styles porque this.constructor es mi clase
            const { styles } = this.constructor;
            // guardo si hay estilos y si la array no esta vacia
            const hasStyles = styles && styles.length;
            // si no cree ya la hoja de estilos y hay estilos
            if (!this.constructor[sheet] && hasStyles) {
                // creo una stylesheet y hago que importe las urls definidas en class.styles
                const ss = new CSSStyleSheet();
                const text = styles.map((url) => {
                    return `@import url("${url}");`;
                }).join('\n')
                ss.replace(text);
                // class[sheet] = hoja creada anteriormente
                this.constructor[sheet] = ss;
            }
            // si tenia estilos
            if(hasStyles){
                // hago que el shadowroot adopte los estilos que acabo de crear
                // o que se crearon antes
                this.shadowRoot.adoptedStyleSheets = [this.constructor[sheet]];
            }
        }
    }
}

export { CSSModulesMixin };

function calculoCaro(a,b){
    return a + b;
}
function memo(fn){
    const invocaciones = new Map();
    return function(...args){
        if(!invocaciones.has(args)){
            invocaciones.set(args, fn(...args));
        }
        return invocaciones.get(args);
    }
}

calculoCaro(1,2);
calculoCaro(1,2);
calculoCaro(3,5);
