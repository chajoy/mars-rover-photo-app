import "./styles.scss";

const getData = async () => {
  try {
    const response = await fetch("/.netlify/functions/api/api.js?name=Test");
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(`${error.message}`);
  }
};

getData();
