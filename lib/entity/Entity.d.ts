/**
 * @description: First class citizen object whose attributes can be inherited from n other entity types, can be
 * subscribed to entity collections and processed by other functions or class methods. It does not contain behaviour appart from getters and state validators.
 */
export declare class Entity {
    private __ID;
    private __TYPE;
    private __children;
    private __collections;
    private __modified;
    constructor(__ID: string, __TYPE: string);
    get id(): string;
    get type(): string;
    belongsTo(collectionName: string): boolean;
    collections(): Set<string>;
    linkTo(collectionName: string): void;
    unlinkFrom(collectionName: string): void;
    appendChild(name: string, child: Entity): void;
    getChild(name: string): Entity | undefined;
    deleteChild(name: string): void;
}
