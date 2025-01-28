const main = document.querySelector("main");

const Cards = (() => {
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

export { Cards };
