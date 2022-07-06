import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Car 
{
    constructor(title =  "iss the OG CAR MFS")
    {
        this.intersected = false
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.title = title

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('car')
        }

        // Resource
        this.resource = this.resources.items.carModel
        this.setModel()

    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.3, 0.3, 0.3)
        this.model.position.set(-5, 1.3, 0)
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