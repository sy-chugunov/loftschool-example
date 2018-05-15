/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

// vvvvv Закомментировать для проверки перезагрузки vvvvv

let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

// ^^^^^ Закомментировать для проверки перезагрузки ^^^^^

// vvvvv Раскомментировать для проверки перезагрузки vvvvv

// let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.jso';
// let attempts = 0;

// ^^^^^ Раскомментировать для проверки перезагрузки ^^^^^

function loadTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onload = () => {
            if (xhr.status < 400) {
                let citiesObjects = JSON.parse(xhr.responseText);

                citiesObjects.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }

                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });

                resolve(citiesObjects);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.send();
    });
}

/*
Функция должна проверять встречается ли подстрока chunk в строке full
Проверка должна происходить без учета регистра символов

Пример:
isMatching('Moscow', 'moscow') // true
isMatching('Moscow', 'mosc') // true
isMatching('Moscow', 'cow') // true
isMatching('Moscow', 'SCO') // true
isMatching('Moscow', 'Moscov') // false
*/
function isMatching(full, chunk) {
    let string = full.toLowerCase();
    let part = chunk.toLowerCase();

    return string.includes(part);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let cities = [];

function tryToLoadCities() {
    loadTowns()
        .then(result => {
            cities = result;

            loadingBlock.innerHTML = '';
            filterBlock.style.display = 'initial';

            let reloadButton = homeworkContainer.querySelector('button');

            if (reloadButton) {
                reloadButton.remove();
            }
        },
        error => {
            loadingBlock.textContent = `Не удалось загрузить города: ${error}`;
            
            if (!homeworkContainer.querySelector('button')) {
                let reloadButton = document.createElement('button');

                reloadButton.textContent = 'Повторить';
                reloadButton.onclick = () => tryToLoadCities();
                
                loadingBlock.parentElement.appendChild(reloadButton);
            }
            
            // vvvvv Раскомментировать для проверки перезагрузки vvvvv
            
            // ++attempts;
            // if (attempts > 2) {
            //     url += 'n';
            // }

            // ^^^^^ Раскомментировать для проверки перезагрузки ^^^^^
        }
        );
}

tryToLoadCities();

filterInput.addEventListener('keyup', function () {
    filterResult.innerHTML = '';
    let userInput = filterInput.value;

    if (!userInput) {
        return;
    }

    for (let city of cities) {
        if (isMatching(city.name, userInput)) {
            let cityDiv = document.createElement('div');

            cityDiv.textContent = city.name;
            filterResult.appendChild(cityDiv);
        }
    }
});

export {
    loadTowns,
    isMatching
};
