import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Room 
{
    constructor(title = "room")
    {
        this.intersected = false
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.title = title
        

        // Resource
        this.resource = this.resources.items.roomModel
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(5, 5, 5)
        this.scene.add(this.model)
        this.experience.intersectable.push(this.model)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.title = this.title
            }
        })
    }
}