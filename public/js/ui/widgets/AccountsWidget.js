/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (!this.element ) {
      throw new Error( 'Элемент не существует' );
    } 
    this.registerEvents();
    this.update();
    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = this.element.querySelector('.create-account');

    createAccount.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('createAccount').open();
    });

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      //возвращает ближайшего предка,соответствующего селектору. на котором был клик
      const account = e.target.closest('.account'); 
      if (account) {
        this.onSelectAccount(account);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();

    if (user) {
      Account.list(user, (err, response) => {
        if (response.success) {
          this.clear();
          // исп метод forEach для вывода списка счетов (item - объект с данными о счёте)
          response.data.forEach(item => this.renderItem(item));
        } 
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const account = this.element.querySelectorAll( '.account' );
    account.forEach( item => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if ( this.currentAccountId ) {
      const account = this.element.querySelector( `.account[data-id="${this.currentAccountId}"]` );
      if (account) {
        account.classList.remove( 'active' );
      } else {
        this.currentAccountId = null;
      }
    }

    element.classList.add( 'active' );

    const { id } = element.dataset;

    this.currentAccountId = id;

    App.showPage('transactions', { account_id: element.dataset.id });

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    let id = item.id;
    let name = item.name;
    let sum = item.sum;
    let html = `
      <li class="account" data-id="${ id }">
          <a href="#">
              <span>${ name }</span> / 
              <span>${ sum } ₽</span>
          </a>
      </li>
    `;
    return html;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
  }
}