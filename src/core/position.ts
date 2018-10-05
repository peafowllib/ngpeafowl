import { offsetParent } from './offset';
import { css } from './css';
export function position(elem: HTMLElement) {

    var offsetParent: HTMLElement, offset, doc,

        parentOffset = { top: 0, left: 0 };
    if (elem.style.position === "fixed") {
        offset = elem.getBoundingClientRect();

    } else {
        offset = elem.getBoundingClientRect();
        doc = elem.ownerDocument;
        offsetParent = <HTMLElement>elem.offsetParent || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) && css(offsetParent, o => o.position) === "static") {

            offsetParent = <HTMLElement>offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
            // parentOffset.top += offsetParent.style.borderTopWidth;
            // parentOffset.left += offsetParent.style.borderLeftWidth;
        }
    }
    return {
        top: offset.top - parentOffset.top, //- jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left// - jQuery.css(elem, "marginLeft", true)
    };
}