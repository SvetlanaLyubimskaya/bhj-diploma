/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    // xhr.open('GET', URL);
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    // xhr.send();

    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            console.log(xhr.responseText); 
        }; 
    };

    if (xhr.method == 'GET') {
        for (let key in data) { 
            URL += `${key}=${data[key]}`; 
        }
        
        xhr.open('GET', URL);
        xhr.send();
    } else {
        let formData = new FormData();
    
        for (let key in data) {
            formData.append(key, data[key]);
        }

        xhr.open(xhr.method, URL); //
        xhr.send(formData);
    }

};
