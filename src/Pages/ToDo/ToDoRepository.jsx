import api from "../../services/api";

async function getAllTodos() {
  try {
    const response = await api.get('/todos?pageSize=20&pageNo=0&sortBy=todoId');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const addTodo = async (task) => {
  try {
    const response = await api.post('/todos/create', task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (id, task) => {
  try {
    const response = await api.put(`/todos/update/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { addTodo, deleteTodo, getAllTodos, updateTodo };

