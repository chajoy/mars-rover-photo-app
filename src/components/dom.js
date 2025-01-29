const Cards = (() => {
  const main = document.querySelector("main");
  const create = (imgsrc) => {
    const card = {
      container: document.createElement("div"),
      img: document.createElement("img"),
    };

    card.container.classList.add("card");
    card.img.src = imgsrc;

    card.container.appendChild(card.img);

    main.append(card.container);
  };

  const clear = () => {
    while (main.firstChild) {
      main.firstChild.remove();
    }
  };

  return {
    create,
    clear,
  };
})();

const Status = (() => {
  const status_container = document.getElementById("status");

  const set = (type = type.toLowerCase(), msg) => {
    clear();

    if (type === "error") {
      status_container.style.color = "red";
    } else if (type === "warning") {
      status_container.style.color = "yellow";
    } else {
      status_container.style.color = "";
    }

    status_container.textContent = msg;
  };

  const clear = () => {
    status_container.textContent = "";
  };

  return {
    set,
    clear,
  };
})();

export { Cards, Status };
