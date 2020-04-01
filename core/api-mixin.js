function APIMixin(Super) {
    return class API extends Super {
        connectedCallback(){
        }
        disconnectedCallback(){
        }
        render(){
            throw new Error('Not implemented');
        }
    }
}

export {APIMixin};