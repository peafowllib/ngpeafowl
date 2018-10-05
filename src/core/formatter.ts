export function formatCssUnit(value: number | string) {
    return typeof value === 'string' ? value as string : `${value}px`;
}

export function unFormatCssUnit(value: number | string): number {
    return typeof value === 'string' ? parseInt(value) : value;
}

