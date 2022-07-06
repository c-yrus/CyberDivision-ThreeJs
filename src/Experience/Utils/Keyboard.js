import EventEmitter from "./EventEmitter";
import Experience from "../Experience";
import gsap from "gsap";

export default class Keyboard extends EventEmitter{

    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.keys = [];
        this.clicked = false;
        this.boxes = [];
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
        if(this.keydown("e") && (this.experience.intersected!=null) && !this.clicked ){
            this.clicked = true;
            if(this.experience.intersected.object.name==="fox" ){
                for(let i=0;i<this.boxes.length;i++){
                    this.scene.remove(this.boxes[i]);
                }
                // Rotate camera  
                gsap.to(this.experience.camera.instance.rotation, {
                    x: 0,
                    y: Math.PI/2,   
                    z: 0,
                    duration: 1,
                    ease: "power1.inOut"
                });
                gsap.fromTo(this.experience.world.plane.scale,{x:1},{duration:1,x:0,delay:1});
                gsap.fromTo(this.experience.world.plane2.scale,{x:1},{duration:1,x:0,delay:1});
                for(let i=0;i<3;i++){
                    for(let j=0;j<3;j++){
                        this.experience.world.creatBox(-7,0,j*2-11)
                        const id = this.experience.world.boxes.pop()
                        // set random title 
                        gsap.fromTo(id.position,{duration:1,y:-i*2-2},{duration:1,y:i*2+0.5,delay:1.5});
                        this.boxes.push(id)
                    }
                }
            }
            else if(this.experience.intersected.object.name!=="fox" ){          
                const popup = document.querySelector(".popup");
                //change popup title 
                popup.querySelector(".popup-title").innerHTML = this.experience.intersected.object.title;
                popup.classList.add("active");
                this.experience.camera.controls.unlock();
            }
            setTimeout(()=>{
                this.clicked = false;
            },1000)
        }

    }



}