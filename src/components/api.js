import { Status } from "./dom";
import { camera_names } from "../constants/constants";

const fetchAPI = async (rover, date) => {
  if (!date || !rover) {
    let errorMsg = "Missing query parameters: ";
    if (!rover) errorMsg += "rover ";
    if (!date) errorMsg += "date";
    console.error(errorMsg);
    Status.set("error", errorMsg);
    return;
  }
  try {
    const response = await fetch(
      `/.netlify/functions/api/api.js?rover=${rover}&date=${date}`
    );

    if (!response.ok) {
      const errorMessage = `API Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    data.photos.forEach((photo) => {
      let camera = photo.camera.name;
      let desc;
      for (let key in camera_names) {
        if (camera.includes(key)) {
          desc = camera_names[key];
        }
      }
      photo.camera.desc = desc || camera;
    });

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchAPI };
