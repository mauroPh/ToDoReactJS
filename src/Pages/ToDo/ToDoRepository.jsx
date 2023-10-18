import { api } from "../Login/LoginRepository";

async function getAllTodos() {
  try {
    const response = await api.get('/todos?pageSize=5&pageNo=0&sortBy=todoId');
    console.log("getAllTodos:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const addTodo = async (task) => {
  const response = await api.post('/todos/create', task);
  return response.data;
};

const updateTodo = async (id, task) => {
  const response = await api.put(`/todos/${id}`, task);
  return response.data;
};

const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

export { addTodo, deleteTodo, getAllTodos, updateTodo };

