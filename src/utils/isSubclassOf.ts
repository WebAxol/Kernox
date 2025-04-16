export function isSubclassOf(child: Function, parent: Function): boolean {
    let proto = child.prototype;
    
    while (proto) {
        proto = Object.getPrototypeOf(proto);
        if (proto === parent.prototype) {
            return true;
        }
    }

    return false;
}