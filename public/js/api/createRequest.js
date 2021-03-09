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
        for (let key in options.data) {
            URL += `${key}=${options.data[key]}`;
        }
        try {
            xhr.open('GET', URL);
            xhr.send();
        } catch (err) {
            console.log(err);
        }
    } else {
        let formData = new FormData();

        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        try {
            xhr.open(options.method, URL);
            xhr.send(formData);
        } catch (err) {
            console.log(err);
            options.callback(err);
        }
    }

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(xhr.status, xhr.statusText, xhr.response);
            options.callback(xhr.status, xhr.response);
        } else {
            console.log(xhr.response);
            options.callback(xhr.status, xhr.response);
        }
    };

    xhr.onerror = function () {
        console.log(xhr.status, xhr.statusText, xhr.response);
    };


    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    //         console.log(xhr.response);
    //         options.callback(xhr.status, xhr.response);
    //     } else {
    //         console.log(xhr.response);
    //         options.callback(xhr.status, xhr.response);
    //     }
    // };

    // xhr.open(options.method, URL);
    // xhr.send();




    //////////////////////////////////////////////
    // let xhr = new XMLHttpRequest();
    // // xhr.open('GET', URL);
    // xhr.withCredentials = true;
    // xhr.responseType = 'json';
    // // xhr.send();

    // xhr.open(xhr.method, URL);
    // xhr.send();

    // xhr.onload = function () {
    //     if (xhr.status != 200) { 
    //         console.log(`${xhr.status}: ${xhr.statusText}:${xhr.response}`); 
    //         options.callback(xhr.status, xhr.response);
    //     } else { 
    //         console.log(`${xhr.response}`);
    //         options.callback(xhr.status, xhr.response);
    //     }
    // };

    // xhr.onerror = function () {
    //     console.log(`${xhr.status}: ${xhr.statusText}:${xhr.response}`);
    // };

    // // xhr.onreadystatechange = function () { 
    // //     if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    // //         console.log(xhr.response);
    // //         callback(xhr.status, xhr.response);
    // //     } else {
    // //         callback(xhr.status, xhr.response);
    // //     }
    // // };

    // if (xhr.method == 'GET') {
    //     for (let key in options.data) {
    //         URL += `${key}=${options.data[key]}`;
    //     }
    // } else {
    //     let formData = new FormData();
    
    //     for (let key in options.data) {
    //         formData.append(key, options.data[key]);
    //     }
    // }

};
