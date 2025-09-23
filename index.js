import { handleMouseDown, handleSubmit } from "./handleEvents/handleEvents.js"

const body = document.querySelector('body')

const form = body.querySelector('.form')

form.addEventListener('submit', handleSubmit)

body.addEventListener('mousedown', handleMouseDown)
