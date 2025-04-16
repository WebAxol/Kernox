export interface PrototypeSchema<TypeSchema> {
    name         : string;
    attributes   : TypeSchema;
    collections? : Set<string>;
    inherits?    : PrototypeSchema<any>[];
}