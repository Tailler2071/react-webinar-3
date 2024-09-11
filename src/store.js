/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list || []
    };
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = this.getNewCode();
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = ++this.lastCode;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const isCurrentlySelected = item.selected;

          return {
            ...item,
            selected: !isCurrentlySelected,
            selectionCount: isCurrentlySelected ? item.selectionCount : item.selectionCount + 1
          };
        }

        return {
          ...item,
          selected: false
        };
      })
    });
  }

  getNewCode() {
    return this.state.list.reduce((max, item) => Math.max(max, item.code), 0);
  }
}

export default Store;
