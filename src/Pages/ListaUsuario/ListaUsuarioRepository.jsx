import { api } from "../Login/LoginRepository";

async function getAllUsers() {
  try {
    const response = await api.get('/users', {crossdomain: true});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export { getAllUsers, deleteUser};