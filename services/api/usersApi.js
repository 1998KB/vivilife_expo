import { auth } from "@/firebase";
import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-vivilife-f75b9.cloudfunctions.net/app",
  // baseURL: "http://localhost:3212/",
});

api.interceptors.request.use(async (config) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
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
    console.error(`Error: ${error.response.status} ${error.config.url}`);
    return Promise.reject(error);
  }
);

export const useUsersApi = () => {
  const getWishlist = async (userId) => {
    const response = await api.get(`/users/${userId}/wishlist`);
    return response.data;
  };

  const addToWishlist = async (userId, activity) => {
    const response = await api.post(`/users/${userId}/wishlist`, {
      activityId: activity.id,
      liked: activity.liked,
    });
    console.log("addd ", activity.liked);
    return response.data;
  };

  const updateWishlistActivity = async (
    userId,
    activityId,
    updatedActivity
  ) => {
    const response = await api.patch(
      `/users/${userId}/wishlist/${activityId}`,
      updatedActivity
    );
    return response.data;
  };

  const removeFromWishlist = async (userId, activityId) => {
    const response = await api.delete(
      `/users/${userId}/wishlist/${activityId}`
    );
    return response.data;
  };

  // Booked Methods

  const getBooked = async (userId) => {
    const response = await api.get(`/users/${userId}/booked`);
    return response.data;
  };

  const addToBooked = async (userId, activity) => {
    const response = await api.post(`/users/${userId}/booked`, activity);
    return response.data;
  };

  const updateBookedActivity = async (userId, activityId, updatedActivity) => {
    const response = await api.patch(
      `/users/${userId}/booked/${activityId}`,
      updatedActivity
    );
    return response.data;
  };

  const removeFromBooked = async (userId, activityId) => {
    const response = await api.delete(`/users/${userId}/booked/${activityId}`);
    return response.data;
  };

  return {
    getWishlist,
    addToWishlist,
    updateWishlistActivity,
    removeFromWishlist,
    getBooked,
    addToBooked,
    updateBookedActivity,
    removeFromBooked,
  };
};
