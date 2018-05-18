/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookiesObj() {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function contains(fullString, stringPart) {
    if (fullString.toLowerCase().includes(stringPart.toLowerCase())) {
        return true;
    }

    return false;
}

filterNameInput.addEventListener('keyup', function () {
    let part = filterNameInput.value;

    let cookies = getCookiesObj();

    for (let name in cookies) {
        if (cookies.hasOwnProperty(name)) {
            let value = listTable.querySelector(`#name-${name}`);
            let row;
    
            if (value) {
                row = value.parentElement;
            } else {
                continue;
            }
    
            if (contains(name, part) || contains(cookies[name], part)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        }
    }
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    let existingCookie = listTable.querySelector(`#name-${addNameInput.value}`);

    if (existingCookie) {
        existingCookie.textContent = addValueInput.value;
        filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));

        return;
    }

    let name = addNameInput.value;
    let value = addValueInput.value;
    let filter = filterNameInput.value;

    let visible = false;

    if (contains(name, filter) || contains(value, filter)) {
        visible = true;
    }

    addNewRow(visible);
});

function addNewRow(visible) {
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let value = document.createElement('td');
    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('button');

    name.textContent = addNameInput.value;

    value.id = `name-${name.textContent}`;
    value.textContent = addValueInput.value;

    deleteButton.textContent = 'Удалить';
    deleteCell.appendChild(deleteButton);

    deleteButton.onclick = () => {
        document.cookie = name.textContent + `=;expires=${new Date().toUTCString()};`
        row.remove();
    };

    row.appendChild(name);
    row.appendChild(value);
    row.appendChild(deleteCell);

    if (visible) {
        row.style.display = 'table-row';
    } else {
        row.style.display = 'none';
    }

    listTable.appendChild(row);
}