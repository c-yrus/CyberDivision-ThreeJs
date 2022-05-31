import EventEmitter from "./EventEmitter";
import Experience from "../Experience";
export default class Keyboard extends EventEmitter{

    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.keys = [];
     
        // Add event 
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

    }
    keydown(key){
        return this.keys[key];
    }
    onKeyDown(event){
        this.keys[event.key] = true;
        this.trigger("keydown");
    }
    onKeyUp(event){
        this.keys[event.key] = false;
        this.trigger("keyup");
    }
    update(){
        if(this.keydown("ArrowUp")||this.keydown("z")){
            this.experience.camera.controls.moveForward(this.experience.camera.speed);
        }
        if(this.keydown("ArrowDown")||this.keydown("s")){
            this.experience.camera.controls.moveForward(-this.experience.camera.speed);
        }
        if(this.keydown("ArrowLeft")||this.keydown("q")){
            this.experience.camera.controls.moveRight(-this.experience.camera.speed);
        }
        if(this.keydown("ArrowRight")||this.keydown("d")){
            this.experience.camera.controls.moveRight(this.experience.camera.speed);
        }
        if(this.keydown("e") && this.experience.world.fox.intersected){
            const popup = document.querySelector(".popup");
            popup.classList.add("active");
            this.experience.camera.controls.unlock();
        }

    }



}