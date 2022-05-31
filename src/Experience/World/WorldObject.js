import EventEmitter from "../Utils/EventEmitter";
export default class WorldObject extends EventEmitter{
    constructor(name){
        super()
        this.name = name;
        this.intersected = false;
    }
    setInersected(bool){
        this.intersected = bool;
    }
    isIntersected(){
        return this.intersected;
    }


}