import * as THREE from 'three'
import Experience from "../Experience";
import WorldObject from "./WorldObject";

export default class box extends WorldObject {

    constructor(){
        super("box")
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setInstance()

    }
    setInstance(){
        this.instance = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        )
        this.instance.name = "box"
        this.instance.position.set(5, 1, 0)
        this.instance.castShadow = true
        this.instance.receiveShadow = true
        this.scene.add(this.instance)
    }
}