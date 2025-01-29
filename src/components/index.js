import "../styles/styles.scss";
import { Cards, Status } from "./dom";

const input = {
  date: document.getElementById("input_date"),
  button_search: document.getElementById("btn_search"),
};

input.button_search.addEventListener("click", () => {
  fetchAPI(input.date.value);
});

const fetchAPI = async (date) => {
  if (!date) {
    let errorMsg = "no date specified";
    console.error(errorMsg);
    Status.set("error", errorMsg);
    return;
  }
  try {
    const response = await fetch(`/.netlify/functions/api/api.js?date=${date}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    if (data.photos.length === 0) {
      console.error("No photos found");
      Status.set("error", "no photos found");
      return;
    }

    console.log(data.photos);

    Status.clear();
    Cards.clear();

    for (let x = 0; x < data.photos.length; x++) {
      Cards.create(data.photos[x].img_src);
    }
  } catch (error) {
    console.error(error.message);
  }
};
