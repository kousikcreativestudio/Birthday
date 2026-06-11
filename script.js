// WAIT DOM LOAD
window.onload = function () {

  // INTRO
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("mainScene").style.display = "block";

    startStory();
  }, 3000);

};


function startStory() {

  let music = document.getElementById("music");

  // play music on first click (browser rule)
  document.body.addEventListener("click", () => {
    music.play();
  }, { once: true });


  // Queen enters
  setTimeout(() => {
    document.getElementById("queen").style.left = "40%";
  }, 2000);

  // Blow candles
  setTimeout(() => {
    document.getElementById("candles").innerHTML = "";
  }, 5000);

  // Fireworks
  setTimeout(() => {
    startFireworks();
  }, 6000);

  // Final text
  setTimeout(() => {
    document.getElementById("finalText").style.display = "block";
  }, 8000);

  // Button show
  setTimeout(() => {
    document.getElementById("surpriseBtn").style.display = "block";
  }, 10000);
}


// FIREWORK
function startFireworks() {

  let container = document.getElementById("fireworks");

  setInterval(() => {

    let spark = document.createElement("div");

    spark.style.position = "absolute";
    spark.style.width = "6px";
    spark.style.height = "6px";
    spark.style.background = "yellow";
    spark.style.borderRadius = "50%";

    spark.style.top = Math.random() * 100 + "%";
    spark.style.left = Math.random() * 100 + "%";

    container.appendChild(spark);

    setTimeout(() => spark.remove(), 1000);

  }, 80);
}


// BUTTON
document.addEventListener("click", function () {
  let btn = document.getElementById("surpriseBtn");
  if (btn) {
    btn.onclick = () => {
      window.location.href = "surprise.html";
    };
  }
});
