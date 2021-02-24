/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
    xhr.send();

    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            console.log(xhr.responseText); 
        }; 
    };

};
