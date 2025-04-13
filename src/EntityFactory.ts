import { PrototypeSchema } from "./types/PrototypeSchema.js";
import { Entity } from "./Entity";

export class EntityFactory{
    
    private types :Map<string,PrototypeSchema<any>> = new Map();
    private pools :Map<string,[]> = new Map();
    private nextID : number = 0;
   
    public registerType(prototype : PrototypeSchema<any>) : void {

        const { name, inherits } = prototype;

        if(this.types.has(name)) throw Error(`The type named '${name}' has already been registered`);
        
        // Inherit attributes and collections from parent types

        if(inherits){

            const parents = inherits;
            const stack :PrototypeSchema<any>[] = [];
            
            for(const parent of parents){
                stack.push(parent);
            }

            let current : PrototypeSchema<any> | undefined = stack.pop();

            while(current){

                // Copy each property from parent type to the new type

                const temp = {};
                
                this.deepAssign(temp,current.attributes);
                this.deepAssign(temp,prototype.attributes);

                prototype.attributes = temp;

                // Join type collections with collections belonging to parent type

                prototype.collections = new Set([
                    ...(prototype.collections   || []), 
                    ...(current.collections     || [])
                ]);

                for(const parent of (current.inherits || [])){
                    stack.push(parent);
                }

                current = stack.pop();
            }            
        }

        this.types.set(name, prototype);
    }

    public createEntity(type : string, params : object) : Entity {

        const prototype : PrototypeSchema<any> | undefined = this.types.get(type);

        if(!prototype){ 
            throw Error(`Cannot create entity of null type '${type}'`);
        }

        const entity : Entity = new Entity('' + this.nextID++, type);

        this.copyFromPrototype(entity, prototype);

        for(const param of Object.keys(params)){
            entity[param] = params[param];
        }

        for(const collection of (prototype.collections || [])){
            entity.linkTo(collection);
        }

        return entity;
    }

    public copyFromPrototype(recipient : Entity, prototype : PrototypeSchema<any>) : void {
        
        this.deepAssign(recipient,prototype.attributes);
    }

    private deepAssign(recipient : Object, prototype : any, seen = new WeakMap()) : void {
        
        if (seen.has(prototype)) return;
    
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