export function isSubclassOf(child, parent) {
    let proto = child.prototype;
    while (proto) {
        proto = Object.getPrototypeOf(proto);
        if (proto === parent.prototype) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=isSubclassOf.js.map