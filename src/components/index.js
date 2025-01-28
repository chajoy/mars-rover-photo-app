import "../styles/styles.scss";
import { Cards } from "./dom";

const input = {
  date: document.getElementById("input_date"),
  button_search: document.getElementById("btn_search"),
};

input.button_search.addEventListener("click", () => {
  fetchAPI(input.date.value);
});

const fetchAPI = async (date) => {
  if (!date) {
    console.error("no date specified");
    return;
  }
  try {
    const response = await fetch(`/.netlify/functions/api/api.js?date=${date}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    Cards.clear();
    Cards.create(data.photos[0].img_src);
  } catch (error) {
    console.error(error.message);
  }
};
