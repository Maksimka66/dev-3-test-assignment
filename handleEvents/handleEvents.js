import { moveAt } from "../coordinatesCalc/coordinatesCalc.js";
import { body, form, inputField, textParagraph } from "../elements/elements.js";

let draggedLetter = null;
let offsetX = 0;
let offsetY = 0;

export function handleSubmit(e) {
    e.preventDefault();

    body.querySelectorAll('.grab-symbol').forEach(span => span.remove());
    textParagraph.innerHTML = '';

    inputField.value.split('').forEach(letter => {
        const spanElem = document.createElement('span');
        spanElem.textContent = letter;
        spanElem.classList.add('grab-symbol');
        textParagraph.appendChild(spanElem);
    });

    form.reset();
}

export function handleMouseDown(e) {
    const target = e.target;
    if (!target || target.tagName !== 'SPAN') return;

    draggedLetter = target;

    const rect = draggedLetter.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    draggedLetter.style.position = 'absolute';
    draggedLetter.style.zIndex = 999;
    document.body.append(draggedLetter);

    const pos = moveAt(e.pageX, e.pageY, offsetX, offsetY);
    draggedLetter.style.left = pos.left;
    draggedLetter.style.top = pos.top;
}

export function handleMouseMove(e) {
    if (!draggedLetter) return;

    const pos = moveAt(e.pageX, e.pageY, offsetX, offsetY);
    draggedLetter.style.left = pos.left;
    draggedLetter.style.top = pos.top;
}

export function handleMouseUp(e) {
    if (!draggedLetter) return;

    // временно скрываем перетаскиваемый элемент, чтобы elementFromPoint вернул букву под ним
    draggedLetter.style.display = 'none';
    let target = document.elementFromPoint(e.clientX, e.clientY);
    draggedLetter.style.display = '';

    // проверяем, что target — спан из textParagraph
    if (target && target.tagName === 'SPAN' && target !== draggedLetter && textParagraph.contains(target)) {
        // меняем текст местами
        const temp = target.textContent;
        target.textContent = draggedLetter.textContent;
        draggedLetter.textContent = temp;
    }

    // оставляем букву там, куда её перенесли
    draggedLetter.style.zIndex = '';
    draggedLetter = null;
}
