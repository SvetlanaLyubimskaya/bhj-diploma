/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;
    console.log(options);
    URL = options.url;

    if (options.method == 'GET') {
        URL += '?';
        for (let key in options.data) {
            URL += `${key}=${options.data[key]}&`;
        }
        URL = URL.length - 1;
    } else {
        let formData = new FormData();

        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        
    }

    try {
        xhr.open(options.method, URL);
        xhr.send();
    } catch (err) {
        console.log(err);
        options.callback(err);
    }

    xhr.onload = function () {
        console.log(xhr.response);
        options.callback(xhr.status, xhr.response);
    };

    xhr.onerror = function () {
        console.log(xhr.status, xhr.statusText, xhr.response);
    };

};
