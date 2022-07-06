import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Box 
{
    constructor(x,y,z)
    {
        const watchesNames = ["Montblanc" , "Rolex" , "Fossil" , "Seiko","Van Cleef & Arpels"];
        this.intersected = false
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.title = watchesNames[Math.floor(Math.random()*watchesNames.length)];
        this.id = this.setModel(x,y,z)
        

    }

    setModel(x,y,z)
    {
        var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        var color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);
        var material = new THREE.MeshBasicMaterial({color: color});
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(x, y, z);
        this.cube.title=this.title
        this.scene.add(this.cube);
        this.experience.intersectable.push(this.cube)
        return this.cube;
    }

}