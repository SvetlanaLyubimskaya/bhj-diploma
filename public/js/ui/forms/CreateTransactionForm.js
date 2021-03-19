/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (response) {
        const accountsSelect = this.element.querySelector('.accounts-select');
        accountsSelect.innerHTML = '';
        
        accountsSelect.insertAdjacentHTML('beforeEnd', response.data.array.forEach(element => {`
        <option value="${element.id}">${element.name}</option>`}));
      } else {
        console.log(err);
      }

    });
    
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response) {
        App.update();
        App.getModal('createTransaction').close();
      } else {
        console.log(err);
      }
    });
  }
}