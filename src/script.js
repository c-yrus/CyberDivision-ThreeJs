import './style.css'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

const btn = document.querySelector('#button1')
btn.addEventListener('click', () => {
    experience.camera.controls.lock()
    
   // popup.classList.toggle("active");
})
const btnClose = document.querySelector('#close')
btnClose.addEventListener('click', () => {
    const popup = document.querySelector(".popup");
    popup.classList.remove("active");
    experience.camera.controls.lock()
})