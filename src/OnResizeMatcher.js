import ResizeObserver from 'resize-observer-polyfill';
import { defineMatcher } from '@telenko/matcher';

const OBSERVER = Symbol();

class OnResizeMatcher {

    connectedCallback() {
        this[OBSERVER] = new ResizeObserver(entries => {
            let mutationDetail = {};
            for (const entry of entries) {
                if (entry.target !== this.element) {
                    return;
                }
                const { left, top, width, height } = entry.contentRect;
                mutationDetail = Object.assign({}, mutationDetail, { left, top, width, height });
            }
            const resizeEvent = new CustomEvent("resize", { bubbles: false, detail: mutationDetail });
            this.element.dispatchEvent(resizeEvent);
        });
        this[OBSERVER].observe(this.element)
    }

    disconnectedCallback() {
        this[OBSERVER].disconnect();
    }

}

defineMatcher("[observe-resize]", OnResizeMatcher);