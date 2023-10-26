import api from '../../services/api';


async function getAllUsers() {
  try {
    const response = await api.get('/users');
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error);
    return { error: error.message, status: error.response ? error.response.status : 500 };
  }
}

async function addUser(user) {
    try {
        const response = await api.post('/users/create', user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

async function updateUser(id, user) {
  try {
    const response = await api.put(`/users/update/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message, status: error.response ? error.response.status : 500 };
  }
}    

async function deleteUser(id) {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
      console.error(error);
      return { error: error.message, status: error.response ? error.response.status : 500 };
    }
    }

export { addUser, deleteUser, getAllUsers, updateUser };
