import {RenderMixin} from './render-mixin.js';
import {APIMixin} from './api-mixin.js';
import {RefsMixin} from './refs-mixin.js';
import {CSSModulesMixin} from './css-modules-mixin.js';
class BaseElement extends CSSModulesMixin(RefsMixin(RenderMixin(APIMixin(HTMLElement)))) {
    
}

export { BaseElement };