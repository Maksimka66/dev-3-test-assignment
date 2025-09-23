import { body, form, textParagraph, inputField } from "../elements/elements.js";

export function handleSubmit(e) {
    
        e.preventDefault()

        body.querySelectorAll('.grab-symbol').forEach(span => span.remove());
        
        textParagraph.innerHTML = ''
        
        inputField.value.split('').forEach(letter=> {
            const spanElem = document.createElement('span')

            spanElem.textContent = letter
            spanElem.classList.add('grab-symbol')

            textParagraph.appendChild(spanElem)
        })
        
        form.reset()
     
}

export function handleMouseDown(e) {
    

    const letterA = e.target;
    if (!letterA || letterA.tagName !== 'SPAN') return;

    const rectA = letterA.getBoundingClientRect();
    const offsetX = e.clientX - rectA.left;
    const offsetY = e.clientY - rectA.top;

    letterA.style.position = 'absolute';
    letterA.style.zIndex = 1000;
    document.body.append(letterA);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        letterA.style.left = pageX - offsetX + 'px';
        letterA.style.top = pageY - offsetY + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function onMouseUp(ev) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);

        if (elemBelow && elemBelow.tagName === 'SPAN' && elemBelow !== letterA) {
        const rectB = elemBelow.getBoundingClientRect();

        letterA.style.left = rectB.left + window.scrollX + 'px';
        letterA.style.top = rectB.top + window.scrollY + 'px';

        elemBelow.style.position = 'absolute';
        elemBelow.style.left = rectA.left + window.scrollX + 'px';
        elemBelow.style.top = rectA.top + window.scrollY + 'px';
        }
    })
    
}