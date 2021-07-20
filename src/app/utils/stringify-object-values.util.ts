export function stringfyObjectValues(obj: object): string {
    // flattens objects and returns values as a single space separated string
    const flatValues = [];

    (function flatten(o: object): void {
        Object.values(o).forEach(value => {
            if (typeof value === 'object') {
                flatten(value);
            } else {
                flatValues.push(value);
            }
        });
    })(obj);

    return flatValues.join(' ').toLowerCase();
}
