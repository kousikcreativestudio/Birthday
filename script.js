let scene, camera, renderer;
let particles = [];
let fireworks = [];

// INIT
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  window.addEventListener("resize", onResize);

  createParticles();
  animate();
}

// RESPONSIVE FIX
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// FLOATING PARTICLES (BACKGROUND)
function createParticles() {
  const geo = new THREE.SphereGeometry(0.03, 8, 8);

  for (let i = 0; i < 150; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff99ff
    });

    const p = new THREE.Mesh(geo, mat);

    p.position.x = (Math.random() - 0.5) * 10;
    p.position.y = (Math.random() - 0.5) * 10;

    scene.add(p);
    particles.push(p);
  }
}

// 🎆 REAL FIREWORK (THREE.JS PARTICLES)
function createFirework(x, y) {
  let group = new THREE.Group();

  for (let i = 0; i < 80; i++) {
    let geo = new THREE.SphereGeometry(0.02, 6, 6);
    let mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(`hsl(${Math.random()*360},100%,60%)`)
    });

    let p = new THREE.Mesh(geo, mat);

    let angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 0.2 + 0.05;

    p.userData = {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 100
    };

    p.position.set(x, y, 0);
    group.add(p);
  }

  scene.add(group);
  fireworks.push(group);
}

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // background particles
  particles.forEach(p => {
    p.position.y += 0.01;
    if (p.position.y > 5) p.position.y = -5;
  });

  // fireworks update
  fireworks.forEach((group, gi) => {
    group.children.forEach((p, pi) => {
      p.position.x += p.userData.vx;
      p.position.y += p.userData.vy;

      p.userData.vx *= 0.96;
      p.userData.vy *= 0.96;
      p.userData.life--;

      if (p.userData.life <= 0) {
        group.remove(p);
      }
    });

    if (group.children.length === 0) {
      scene.remove(group);
      fireworks.splice(gi, 1);
    }
  });

  renderer.render(scene, camera);
}

// 🎬 START AFTER INTRO
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  init();
  startStory();
}, 3000);

// STORY FLOW
function startStory() {
  let music = document.getElementById("music");

  document.body.addEventListener("click", () => {
    music.play();
  }, { once: true });

  setTimeout(buildCake, 1500);
  setTimeout(walkQueen, 4000);
  setTimeout(blowCandle, 6500);

  // fireworks start
  setTimeout(() => {
    setInterval(() => {
      createFirework(
        (Math.random() - 0.5) * 6,
        Math.random() * 3
      );
    }, 600);
  }, 7000);

  setTimeout(showText, 9000);
  setTimeout(showButton, 11000);

  glowEffect();
}

// 🎂 CAKE BUILD
function buildCake() {
  let cake = document.getElementById("cake");

  let layers = [
    "https://i.ibb.co/vC77KfXQ/cake-slice-bottom.png",
    "https://i.ibb.co/4w1MRHqH/cake-slice-Middle.png",
    "https://i.ibb.co/YT2W8dbz/cake-slice-top.png"
  ];

  let i = 0;

  let interval = setInterval(() => {
    cake.src = layers[i];
    cake.style.opacity = "1";
    cake.style.transform = "translateX(-50%) scale(1.05)";

    setTimeout(() => {
      cake.style.transform = "translateX(-50%) scale(1)";
    }, 200);

    i++;

    if (i >= layers.length) {
      clearInterval(interval);
      setTimeout(() => {
        cake.src = "https://i.ibb.co/NnH5qKKj/cake-full.png";
      }, 800);
    }
  }, 900);
}

// 👸 WALKING QUEEN (IMPROVED)
function walkQueen() {
  let queen = document.getElementById("queen");
  let pos = -20;
  let step = 0;

  let walk = setInterval(() => {
    pos += 0.3;
    step++;

    queen.style.left = pos + "%";
    queen.style.transform =
      `translateY(${Math.sin(step * 0.4) * 6}px)`;

    if (pos >= 40) clearInterval(walk);
  }, 16);
}

// 🕯️ CANDLE
function blowCandle() {
  document.getElementById("candle").src =
    "https://i.ibb.co/r28ybz1w/candle-off.png";
}

// TEXT
function showText() {
  document.getElementById("finalText").style.opacity = "1";
}

// BUTTON
function showButton() {
  document.getElementById("btn").style.display = "block";
}

// BUTTON CLICK
document.getElementById("btn").onclick = () => {
  window.location.href = "surprise.html";
};

// 💡 CINEMATIC GLOW
function glowEffect() {
  setInterval(() => {
    let glow = Math.sin(Date.now() * 0.003) * 20 + 40;

    document.body.style.background =
      `radial-gradient(circle, rgba(255,200,150,0.15) ${glow}%, black 80%)`;
  }, 30);
}
