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
    
    this.currentAccountId = null;

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

    const accountsPanel = document.querySelector('.accounts-panel');
    accountsPanel.addEventListener('click', (e) => {
      e.preventDefault();
      this.onSelectAccount();
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
          this.renderItem();
        } else {
          console.log(err);
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
    const account = document.querySelector('.active');
    if (account) {
        account.classList.remove('active');
      }
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });

    // if ( this.currentAccountId ) {
    //   const account = this.element
    //       .querySelector( `.account[data-id="${this.currentAccountId}"]` );
    //   if (account) {
    //     account.classList.remove( 'active' );
    //   }
    //   else {
    //     this.currentAccountId = null;
    //   }
    // }

    // element.classList.add( 'active' );

    // const { id } = element.dataset;

    // this.currentAccountId = id;

    // App.showPage('transactions', {
    //   account_id: id
    // });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account" data-id="${ item.id }">
          <a href="#">
              <span>${ item.name }</span> / 
              <span>${ item.sum } ₽</span>
          </a>
      </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach(item => {
      const {name, id} = item,
          sum = item.sum.toLocaleString('en'),
          html = this.getAccountHTML({
            name, id, sum
          });
      this.element.insertAdjacentHTML('beforeend', html);
    });
  }
}