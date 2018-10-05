
function getStyle(elem: Element) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
        view = window;
    }
    return view.getComputedStyle(elem);
}

export function css<T>(elem: HTMLElement, getProperty: (o: CSSStyleDeclaration)=> T) {
    var style = getStyle(elem);
    return getProperty(style);
}