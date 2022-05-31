import * as THREE from 'three'
import Experience from './Experience.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import WorldObject from './World/WorldObject.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.speed = 0.1
        this.setInstance()
        this.setControls()
        this.setRaycaster()
    }

    setRaycaster(){
        this.raycaster = new THREE.Raycaster()
        this.raycaster.params.Points.threshold = 0.1
        this.raycaster.near = 0.1
        this.raycaster.far = 10
    }
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 2, 10)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new PointerLockControls(this.instance, this.canvas)
        this.controls.addEventListener( 'lock', function () {
            const btn = document.querySelector('#button1')
            btn.classList.add('hide');
        } );
        this.controls.addEventListener( 'unlock', function () {
            const btn = document.querySelector('#button1')
            btn.classList.remove('hide');
        } );
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.instance)
        let intersects = this.raycaster.intersectObjects()
        
        if(intersects.length > 0){
            let intersect = intersects[0]
                if(intersect.object.name == 'fox'){
                    this.experience.world.fox.intersected = true
                    this.experience.world.fox.changeColor()
                }
                else{
                    this.experience.world.fox.intersected = false
                    this.experience.world.fox.normalColor()
                }
        }
        if(intersects.length ==0){
            if(this.experience.world.fox){
                this.experience.world.fox.intersected = false
                this.experience.world.fox.normalColor()
            }
        }
        
        
    }
    
}