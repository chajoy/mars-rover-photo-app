const Cards = (() => {
  const main = document.querySelector("main");
  const create = (imgdata) => {
    const card = {
      container: document.createElement("div"),
      front: document.createElement("img"),
      back: document.createElement("div"),
      camera: document.createElement("p"),
      desc: document.createElement("p"),
    };

    card.camera.textContent = `camera: ${imgdata.camera.name}`;
    card.desc.textContent = `desc: ${imgdata.camera.desc}`;

    card.back.append(card.camera, card.desc);

    card.container.classList.add("card");

    card.front.src = imgdata.img_src;
    card.front.classList.add("front");
    card.front.setAttribute("draggable", false);

    card.back.classList.add("back");

    card.container.append(card.front, card.back);

    card.container.addEventListener("click", () => {
      let activeCard = document.querySelector(".flip");
      if (activeCard && activeCard !== card.container) {
        activeCard.classList.remove("flip");
      }
      card.container.classList.toggle("flip");
    });

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
