import axios from 'axios';

const tasksAPI = axios.create({baseURL:'http://localhost:8080/tasks'}) ;


async function getAllTasks() {
  try {
    const response = await tasksAPI.get('/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function addTask(task) {
  try {
    const response = await tasksAPI.post('/',task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteTask(id){
  try {
    const response = await tasksAPI.delete(`/${id}`);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function updateTask(id, updates) {
  try {
    const response = await tasksAPI.put(`/${id}`, updates);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask
};
