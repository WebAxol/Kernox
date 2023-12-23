import EntityManager from "./EntityManager.js";
import CollectionManager from "./CollectionManager.js";
import EventManager from "./EventManager.js";
import Service from "./Service.js";
import ServiceManager from "./ServiceManager.js";

class World {

    #entityManager;
    #collectionManager;
    #serviceManager;
    #eventManager;

    constructor(){

         // subordinate modules

        this.#entityManager     = new EntityManager(this);
        this.#collectionManager = new CollectionManager(this);
        this.#eventManager      = new EventManager(this);
        this.#serviceManager    = new ServiceManager(this);

        //Iteration

        this.frame = 0;
        this.routine = () => {};
        this.pause = false;
    }

    registerService(name,service){
        return this.#serviceManager.registerService(name,service);
    }

    getServices(){
        return this.#serviceManager.getServices();
    }

    getService(serviceName){
        return this.#serviceManager.getService(serviceName);
    }

    registerCollection(name){
        return this.#collectionManager.registerCollection(name);
    }

    getCollection(collectionName){
        return this.#collectionManager.getCollection(collectionName);
    }


    addToCollection(collectionName,object){
        return this.#collectionManager.addToCollection(collectionName,object);
    }

    removeFromCollection(collectionName,object){
        return this.#collectionManager.cacheToBeRemoved(collectionName,object);
    }

    registerEntityType(typeName,prototype){
        return this.#entityManager.registerType(typeName,prototype);
    }

    hasEntityType(typeName){
        return this.#entityManager.hasEntityType(typeName);
    }

    createAgent(typeName,details = undefined){

        let entity = this.#entityManager.createAgent(typeName,details);
        
        /*

        let collections = this.#entityManager.getCollectionsOfType(typeName);

        collections.forEach((collection) => {
            this.addToCollection(collection, entity);
        });

        */

        return entity;
    }

    removeAgent(entity){
        this.#entityManager.storeToBeRemoved(entity);
    }

    registerEvent(eventName){
        this.#eventManager.registerEvent(eventName);
    }

    registerServiceToEvent(serviceName,eventName){
        this.#eventManager.registerServiceToEvent(serviceName,eventName);
    }

    notifyEvent(eventName,details){
        this.#eventManager.notifyToServices(eventName,details);
    }

    execute(){
        

        if(this.pause){
            return;
        }

        requestAnimationFrame(() => { this.execute() });

        this.#entityManager.removeAgents();
        this.#collectionManager.removeAgentsFromCollections();
        var services = this.getServices();

        Object.keys(services).forEach((service) => {
                services[service].execute();
        });

        if(!this.pause){
            this.frame++;
            this.routine(this);
        }
    }

    pauseExecution(){
        this.pause = true;
    }
}

export default World;