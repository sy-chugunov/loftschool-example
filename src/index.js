/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; ++i) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let result = [];

    for (let i = 0; i < array.length; ++i) {
        result[i] = fn(array[i], i, array);
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let result;
    let i = 0;

    if (initial === undefined) {
        result = array[0];
        i = 1;
    } else {
        result = initial;
    }

    for (i; i < array.length; ++i) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let keys = Object.keys(obj);

    return keys.map(function(key) {
        return key.toUpperCase();
    });
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let begin = 0;
    let end = array.length;
    let result = [];

    if (from !== undefined) {
        begin = from >= 0 ? from : array.length + from;

        if (begin < 0) {
            begin = 0;
        }

        if (begin > array.length) {
            begin = array.length;
        }
    }

    if (to !== undefined) {
        end = to >= 0 ? to : array.length + to;

        if (end < 0) {
            end = 0;
        }

        if (end > array.length) {
            end = array.length;
        }
    }

    for (let i = begin, j = 0; i < end; ++i, ++j) {
        result[j] = array[i];
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = {
        set: function (target, prop, value) {
            target[prop] = value * value;
            
            return true;
        }
    };
    
    return new Proxy(obj, handler);
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
