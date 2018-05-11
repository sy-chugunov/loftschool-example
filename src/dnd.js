/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

let button = document.createElement('button');

button.setAttribute('id', 'addDiv');
/*
homeworkContainer - это контейнер для всех ваших домашних заданий
Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

Пример:
const newDiv = document.createElement('div');
homeworkContainer.appendChild(newDiv);
*/
const homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.appendChild(button);
/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let minSize = 50;
    let maxSize = 200;

    let width = Math.floor(Math.random() * (maxSize - minSize) + minSize);
    let height = Math.floor(Math.random() * (maxSize - minSize) + minSize);

    let minPositionX = 10;
    let maxPositionX = window.innerWidth - 10 - width;
    let minPositionY = 10;
    let maxPositionY = window.innerHeight - 10 - height;

    let x = Math.floor(Math.random() * (maxPositionX - minPositionX) + minPositionX);
    let y = Math.floor(Math.random() * (maxPositionY - minPositionY) + minPositionY);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; ++i) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    let color = getRandomColor();

    let newDiv = document.createElement('div');

    newDiv.setAttribute('style',
        `width: ${width}px; height: ${height}px; position: absolute; left: ${x}px; top: ${y}px; background-color: ${color};`);

    newDiv.setAttribute('class', 'draggable-div');

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners() {
    let dragged;

    /* events fired on the draggable target */
    document.addEventListener("dragstart", function (event) {
        console.log("dragstart");
        dragged = event.target;
        dragged.style.opacity = 0.5;
    }, false);

    document.addEventListener("dragend", function (event) {
        console.log("dragend");
        dragged.style.opacity = 1;
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function (event) {
        console.log("dragover");
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("drop", function (event) {
        console.log("drop");
        dragged.style.left = `${event.clientX}px`;
        dragged.style.top = `${event.clientY}px`;
    }, false);
}

addListeners();

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);

    // назначить обработчики событий мыши для реализации D&D
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
