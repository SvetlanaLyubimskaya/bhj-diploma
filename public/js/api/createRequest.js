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
        URL = URL.substring(0, URL.length - 1);

        try {
            xhr.open(options.method, URL, true);
            xhr.send();
        } catch (err) {
            options.callback(err);
        }
       
    } else {
        let formData = new FormData();

        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        
        try {
            xhr.open(options.method, URL, true);
            xhr.send(formData);
        } catch (err) {
            options.callback(err);
        }
    }

    xhr.onload = function () {
        options.callback(xhr.status, xhr.response);
    };

    xhr.onerror = function () {
        console.log(xhr.status, xhr.statusText, xhr.response);
    };
    
};
