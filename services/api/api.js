import axios from "axios";
import Toast from "react-native-toast-message";
import { auth } from "@/firebase";

const api = axios.create({
  // baseURL: "https://us-central1-vivilife-f75b9.cloudfunctions.net/app",
  baseURL: "http://localhost:3212/",
});

api.interceptors.request.use(async (config) => {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    config.headers.Authorization = idToken;
  } catch (error) {
    console.error(error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `${response.config.method.toUpperCase()} ${response.config.url}`,
      {
        [response.status]: response.data,
      }
    );
    return response;
  },
  (error) => {
    console.error(`Error: ${error.response?.status} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const byId = async (collection, id) => {
    const { data } = await api.get(`${collection}/${id}`);
    return data;
  };

  const get = async (collection, userId) => {
    const { data } = await api.get(collection, {
      params: {
        userId: userId || null,
      },
    });

    return data;
  };

  const post = async (collection, body, custom_message) => {
    return await api
      .post(collection, body)
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: custom_message || `${collection} created successfully`,
        });
        return data;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Error creating ${collection}: ${error.message}`,
        });
      });
  };

  const patch = async (collection, id, body, custom_message) => {
    return await api
      .patch(`${collection}/${id}`, body)
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: custom_message || `${collection} updated successfully`,
        });
        return data;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Error updating ${collection}: ${error.message}`,
        });
      });
  };

  const del = async (collection, id, custom_message) => {
    return await api
      .delete(`${collection}/${id}`)
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: custom_message || `${collection} deleted successfully`,
        });
        return data;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Error deleting ${collection}: ${error.message}`,
        });
      });
  };

  const query = async (collection, query) => {
    const { data } = await api.get(collection, { params: query });
    return data;
  };

  return {
    get,
    post,
    patch,
    del,
    byId,
    query,
  };
};
