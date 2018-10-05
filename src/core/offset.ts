import { css } from './css';

export function offsetParent(element: HTMLElement) {
    var offsetParent: HTMLElement = <HTMLElement>element.offsetParent;
    while (offsetParent && css(element, o => o.position) === "static") {
        offsetParent = <HTMLElement>offsetParent.offsetParent;
    }
    return offsetParent || document.documentElement;
}

export function offset(element: HTMLElement) {
    return element.getBoundingClientRect();
}