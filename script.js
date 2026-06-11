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

let scene, camera, renderer, particles = [];

// INIT 3D WORLD
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({canvas: document.getElementById("scene"), alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  createParticles();
  animate();
}

// PARTICLES (BUTTERFLY STYLE LIGHTS)
function createParticles() {
  for (let i = 0; i < 200; i++) {
    let geo = new THREE.SphereGeometry(0.03);
    let mat = new THREE.MeshBasicMaterial({color: 0xff66ff});
    let p = new THREE.Mesh(geo, mat);

    p.position.x = (Math.random() - 0.5) * 10;
    p.position.y = (Math.random() - 0.5) * 10;

    scene.add(p);
    particles.push(p);
  }
}

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  particles.forEach(p => {
    p.position.y += 0.01;
    if (p.position.y > 5) p.position.y = -5;
  });

  renderer.render(scene, camera);
}

// STORY FLOW
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  init();

  startStory();

}, 3000);


// STORY TIMELINE
function startStory() {

  let music = document.getElementById("music");
  music.play();

  // CAKE BUILD
  setTimeout(() => {
    document.getElementById("cake").style.transform = "translateX(-50%) scale(1)";
  }, 2000);

  // QUEEN ENTRY
  setTimeout(() => {
    document.getElementById("queen").style.left = "40%";
  }, 5000);

  // BLOW CANDLES
  setTimeout(() => {
    document.getElementById("cake").innerHTML = "🎂";
  }, 7000);

  // FINAL TEXT
  setTimeout(() => {
    document.getElementById("finalText").style.opacity = "1";
  }, 9000);

  // BUTTON
  setTimeout(() => {
    document.getElementById("btn").style.display = "block";
  }, 11000);
}


// BUTTON
document.getElementById("btn").onclick = () => {
  window.location.href = "surprise.html";
};
