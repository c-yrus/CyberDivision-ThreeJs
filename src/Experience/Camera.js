import * as THREE from 'three'
import Experience from './Experience.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

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
        this.notification = document.querySelector(".notification")
        
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
        let intersects = this.raycaster.intersectObjects(this.experience.intersectable)
        if(intersects.length > 0){
            this.experience.intersected =  intersects[0]
            this.notification.classList.remove("hide")
            return 
        }
        if(intersects.length <=0){
            this.notification.classList.add("hide")
            this.experience.intersected = null
            return 
        }
    }
    
    
}