// INTRO TRANSITION
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainScene").style.display = "block";

  startStory();

}, 3000);


function startStory() {

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


// FIREWORK EFFECT
function startFireworks() {
  let container = document.getElementById("fireworks");

  setInterval(() => {
    let spark = document.createElement("div");
    spark.style.position = "absolute";
    spark.style.width = "5px";
    spark.style.height = "5px";
    spark.style.background = "yellow";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.left = Math.random() * 100 + "%";

    container.appendChild(spark);

    setTimeout(() => spark.remove(), 1000);
  }, 100);
}


// BUTTON CLICK
document.getElementById("surpriseBtn").onclick = () => {
  window.location.href = "surprise.html";
};
