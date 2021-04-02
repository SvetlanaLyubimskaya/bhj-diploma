/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';
  
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', data, callback = f => f){
    return createRequest({
      url: this.URL + '/' + id,
      data: data,
      method: 'GET',
      responseType: 'json',
      callback: callback
    });
  }
}
