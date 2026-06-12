let scene, camera, renderer, particles = [];

// INIT 3D
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  createParticles();
  animate();
}

// PARTICLES
function createParticles() {
  for (let i = 0; i < 120; i++) {
    let geo = new THREE.SphereGeometry(0.03);
    let mat = new THREE.MeshBasicMaterial({color: 0xff66ff});
    let p = new THREE.Mesh(geo, mat);

    p.position.x = (Math.random() - 0.5) * 10;
    p.position.y = (Math.random() - 0.5) * 10;

    scene.add(p);
    particles.push(p);
  }
}

// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  particles.forEach(p => {
    p.position.y += 0.01;
    if (p.position.y > 5) p.position.y = -5;
  });

  renderer.render(scene, camera);
}

// START
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  init();
  startStory();
}, 3000);

// STORY
function startStory() {

  let music = document.getElementById("music");

  document.body.addEventListener("click", () => {
    music.play();
  });

// CAKE
setTimeout(() => {
  let cake = document.getElementById("cake");
  cake.style.transform = "translateX(-50%) scale(1)";
  cake.style.opacity = "1";
}, 2000);

// QUEEN
setTimeout(() => {
  let queen = document.getElementById("queen");
  queen.style.left = "40%";
  queen.style.opacity = "1";
}, 4000);

  // CANDLE OFF
  setTimeout(() => {
    document.getElementById("candle").src = "https://i.ibb.co/r28ybz1w/candle-off.png";
  }, 6000);

  // FIREWORKS
  setTimeout(() => {
    document.getElementById("fireworks").style.display = "block";
  }, 7000);

  // TEXT
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

function createFirework() {
  let particles = [];

  for (let i = 0; i < 50; i++) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = "4px";
    div.style.height = "4px";
    div.style.background = "hsl(" + Math.random()*360 + ",100%,50%)";
    div.style.borderRadius = "50%";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    document.body.appendChild(div);

    let angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 5 + 2;

    particles.push({div, x, y, angle, speed});
  }

  let interval = setInterval(() => {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.div.style.left = p.x + "px";
      p.div.style.top = p.y + "px";
      p.speed *= 0.95;
    });
  }, 30);

  setTimeout(() => {
    particles.forEach(p => p.div.remove());
    clearInterval(interval);
  }, 1000);
}
