// src/utils/localStorage.js

export const getFavorites = (key) => {
  return JSON.parse(localStorage.getItem(`favorites-${key}`)) || [];
};

export const saveFavorites = (key, data) => {
  localStorage.setItem(`favorites-${key}`, JSON.stringify(data));
};
