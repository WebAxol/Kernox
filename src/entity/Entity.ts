/**
 * @description: First class citizen object whose attributes can be inherited from n other entity types, can be 
 * subscribed to entity collections and processed by other functions or class methods. It does not contain behaviour appart from getters and state validators.
 */
export class Entity {

    private __children :{ [ name : string ] : Entity } = {};
    private __collections : Set<string> = new Set();
    private __modified : boolean = false;

    constructor(
        private __ID : string,
        private __TYPE :string,
    ){}

    public get getID() : string {
        return this.__ID;
    }

    public get getType() : string {
        return this.__TYPE;
    }

    public belongsTo(collectionName : string) : boolean {
        return this.__collections.has(collectionName);
    }

    public gets() : Set<string> {
        return this.__collections;
    }

    public linkTo(collectionName : string) : void {
        this.__collections.add(collectionName);
    }
    public unlinkFrom(collectionName : string) : void {
        this.__collections.delete(collectionName);
    }

    public appendChild(name : string, child : Entity) : void {
        if(this.__children[name]) throw Error(`Child already exists with name '${name}' at entity '${this.__ID}'`);
        
        this.__children[name] = child;
    }

    public getChild(name : string) :Entity | undefined {
        return this.__children[name];
    }

    public deleteChild(name : string) :void {
        delete this.__children[name];
    }
}