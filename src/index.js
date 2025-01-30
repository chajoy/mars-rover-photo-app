import "./styles/styles.scss";
import { rovers } from "./constants/constants";
import { fetchAPI } from "./components/api";
import { Cards, Status } from "./components/dom";

const input = {
  date: document.getElementById("input_date"),
  button_search: document.getElementById("btn_search"),
  rover_select: document.getElementById("rover-select"),
};

input.rover_select.addEventListener("input", () => {
  let selected_rover = input.rover_select.value;
  let landing_date = rovers.find(
    (rover) => rover.name === selected_rover
  ).landing_date;
  input.date.setAttribute("min", landing_date);
});

input.button_search.addEventListener("click", () => {
  fetchAPI(input.rover_select.value, input.date.value).then((data) => {
    if (!data || typeof data != "object") {
      return;
    } else {
      const amount_photos = data.photos.length;

      if (amount_photos === 0) {
        let errorMessage = "no photos found";
        console.error(errorMessage);
        Status.set("error", errorMessage);
        return;
      }

      Cards.clear();
      Status.set("", `Photos Found: ${amount_photos}`);

      for (let x = 0; x < amount_photos; x++) {
        Cards.create(data.photos[x].img_src);
      }
    }
  });
});
