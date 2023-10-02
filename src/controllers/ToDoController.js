import ToDoRepository from '../repositories/ToDoRepository';

class ToDoController {
  constructor() {
    this.todoRepository = new ToDoRepository();
  }

  async getAll() {
    const todos = await this.todoRepository.getAll();
    if (todos) {
      console.log(`getAll called and ${todos.length} todos found`);
    } else {
      console.log('getAll called but no todos found');
    }
    return todos;
  }

  async add(text) {
    if (text.trim() === '') {
      console.log('add called but text is empty');
      return;
    }
    const newTodo = { text, completed: false };
    const addedTodo = await this.todoRepository.add(newTodo);
    console.log(`add called and ${addedTodo.text} added`);
    return addedTodo;
  }

  async delete(id) {
    const deletedTodo = await this.todoRepository.delete(id);
    console.log(`delete called and ${deletedTodo.text} deleted`);
    return deletedTodo;
  }

  async update(id, updates) {
    const updatedTodo = await this.todoRepository.update(id, updates);
    console.log(`update called and ${updatedTodo.text} updated`);
    return updatedTodo;
  }
}

export default ToDoController;