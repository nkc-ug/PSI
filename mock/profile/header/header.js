window.onload = function () {
  let btn = document.querySelector(".hamburger");
  let nav = $("#navArea");
  let mask = document.querySelector("#mask");

  btn.onclick = () => {
    console.log("成功");
    nav.toggleClass("open");
  };

  mask.onclick = () => {
    nav.classList.toggle("open");
  };
};
