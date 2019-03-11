import ResizeObserver from 'resize-observer-polyfill';
import { defineMatcher } from '@telenko/matcher';

const OBSERVER = Symbol();

class OnResizeMatcher {

    connectedCallback() {
        this[OBSERVER] = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target !== this.element) {
                    return;
                }
            }
            const detail = this.element.getBoundingClientRect();//@TODO use ResizeObserver data instead
            const resizeEvent = new CustomEvent("resize", { bubbles: false, detail });
            this.element.dispatchEvent(resizeEvent);
        });
        this[OBSERVER].observe(this.element)
    }

    disconnectedCallback() {
        this[OBSERVER].disconnect();
    }

}

defineMatcher("[observe-resize]", OnResizeMatcher);