import { Entity } from "./Entity.js";
export class EntityFactory {
    constructor(__kernox) {
        this.__kernox = __kernox;
        this.types = new Map();
        this.pools = new Map();
        this.nextID = 0;
    }
    prototype(prototype, namespace = '') {
        const name = namespace ? `${namespace}.${prototype.name}` : prototype.name;
        if (this.types.has(name))
            throw Error(`The type named '${name}' has already been registered`);
        // Inherit attributes and collections from parent types
        const { inherits } = prototype;
        if (inherits) {
            const parents = inherits;
            const stack = [];
            for (const parent of parents) {
                stack.push(parent);
            }
            let current = stack.pop();
            while (current) {
                // Copy each property from parent type to the new type
                const temp = {};
                this.deepAssign(temp, current.attributes);
                this.deepAssign(temp, prototype.attributes);
                prototype.attributes = temp;
                // Join type collections with collections belonging to parent type
                prototype.collections = new Set([
                    ...(prototype.collections || []),
                    ...(current.collections || [])
                ]);
                for (const parent of (current.inherits || [])) {
                    stack.push(parent);
                }
                current = stack.pop();
            }
        }
        this.types.set(name, prototype);
    }
    create(type, params) {
        const prototype = this.types.get(type) || this.resolveImplicitNamespace(type);
        if (!prototype) {
            throw Error(`Cannot create entity of null type '${type}'`);
        }
        const entity = new Entity('' + this.nextID++, type);
        this.copyFromPrototype(entity, prototype);
        for (const param of Object.keys(params)) {
            if (param in entity && !param.includes("_"))
                entity[param] = params[param];
        }
        for (const collection of (prototype.collections || [])) {
            entity.linkTo(collection);
        }
        return entity;
    }
    copyFromPrototype(recipient, prototype) {
        this.deepAssign(recipient, prototype.attributes);
    }
    sendToRest(entity) {
    }
    resolveImplicitNamespace(type) {
        const namespaces = this.__kernox.addonLoader.namespaces;
        var resolved, resource;
        for (const namespace of namespaces) {
            resource = this.types[`${namespace}.${type}`];
            if (resource && !resolved)
                resolved = resource;
            else if (resource)
                throw new Error(`Ambiguous entity type '${type}' was requested: a namespace must be specified before it ( Ex. namespace.type ).`);
        }
        return resolved;
    }
    deepAssign(recipient, prototype, seen = new WeakMap()) {
        if (seen.has(prototype))
            return;
        seen.set(prototype, recipient);
        for (const key of Object.keys(prototype)) {
            const value = prototype[key];
            // Primitives
            if (value === null || typeof value !== 'object') {
                recipient[key] = value;
            }
            // Arrays
            else if (Array.isArray(value)) {
                recipient[key] = [];
                this.deepAssign(recipient[key], value, seen);
            }
            // Class instance
            else if (value.constructor !== Object) {
                recipient[key] = new value.constructor();
                this.deepAssign(recipient[key], value, seen);
            }
            // Plane object
            else {
                recipient[key] = {};
                this.deepAssign(recipient[key], value, seen);
            }
        }
    }
}
//# sourceMappingURL=EntityFactory.js.map