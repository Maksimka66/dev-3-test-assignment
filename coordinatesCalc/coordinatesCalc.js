export function moveAt(pageX, pageY, offsetX, offsetY) {
    return {
        left: pageX - offsetX + 'px',
        top: pageY - offsetY + 'px'
    }
}
