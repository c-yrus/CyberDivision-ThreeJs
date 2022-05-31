import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import * as THREE from 'three'
export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.createBox()
            this.fox = new Fox()
            this.environment = new Environment()
            this.experience.intersectable.push(this.fox.model)
            this.experience.intersectable.push(this.cube)
        })
    }
    createBox(){
        var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        var material = new THREE.MeshStandardMaterial({color: 0xFF0000});
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(5, 1, 0);
        this.scene.add(this.cube);
    }


    update()
    {
        if(this.fox)
            this.fox.update()
    }
}