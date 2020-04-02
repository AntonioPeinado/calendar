import {RenderMixin} from './render-mixin.js';
import {APIMixin} from './api-mixin.js';
import {RefsMixin} from './refs-mixin.js';

class BaseElement extends RefsMixin(RenderMixin(APIMixin(HTMLElement))) {
    
}

export { BaseElement };