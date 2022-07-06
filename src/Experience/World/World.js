import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Car from './Car.js'
import Box from './Box.js'
import * as THREE from 'three'
import Room from './Room.js'
export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.boxes = []
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            //this.floor = new Floor()
            this.fox = new Fox()
            this.car = new Car()
            //create a plane
            this.plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(4, 8),
                new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})
            )
            this.plane2 = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(4, 8),
                new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})
            )
            this.plane.rotation.y = -Math.PI*0.5
            this.plane.position.y = 2
            this.plane.position.x -= 7
            this.plane.position.z -=7   
            this.plane2.rotation.y = -Math.PI*0.5
            this.plane2.position.y = 2
            this.plane2.position.x -= 7
            this.plane2.position.z -=11   
            this.scene.add(this.plane)
            this.scene.add(this.plane2)

            this.room = new Room()
            this.environment = new Environment()
            this.experience.intersectable.push(this.fox.model)
        })
    }

    creatBox(x,y,z){
        const box  = new Box(x,y,z)
        this.boxes.push(box.id)    
    }
    update()
    {
        if(this.fox)
            this.fox.update()
    }
}