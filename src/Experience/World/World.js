import Experience from '../Experience.js'
import box from './box.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import WorldObject from './WorldObject.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.createBox()

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    createBox(){
        this.box = new box();
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}