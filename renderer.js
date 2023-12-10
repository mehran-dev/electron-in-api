console.log("renderer is called !!!");

const el = document.getElementById("elx");
const counter = document.getElementById("counter");

const getRand = () => {
  return Math.floor(Math.random() * 255);
};

setInterval(() => {
  elx.style.color = `rgb(${getRand()},${getRand()},${getRand()})`;
  window.API.setTitle("my new Title " + getRand());
}, 1000);

window.API.onUpdateCounter((value) => {
  counter.innerText = value.toString();
  console.log("noops");
});
