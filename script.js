var DEV_MODE_ENABLED = true;
var birthdayTarget = new Date("July 29, 2026 00:00:00").getTime();

var BRAND_LOGO_SVG = [
  '<svg class="brand-logo-svg" viewBox="0 0 100 100">',
  '<path d="M 20 40 L 80 40 L 75 85 L 25 85 Z" fill="none" stroke="#d4af37" stroke-width="1.5"/>',
  '<path d="M 15 30 L 85 30 L 85 40 L 15 40 Z" fill="none" stroke="#d4af37" stroke-width="1.5"/>',
  '<line x1="50" y1="30" x2="50" y2="85" stroke="#e8b4b8" stroke-width="2"/>',
  '<path d="M 50 30 Q 35 15 25 25 Q 25 35 50 30" fill="none" stroke="#e8b4b8" stroke-width="1.5"/>',
  '<path d="M 50 30 Q 65 15 75 25 Q 75 35 50 30" fill="none" stroke="#e8b4b8" stroke-width="1.5"/>',
  '<path d="M 50 22 Q 45 12 50 5 Q 55 12 50 22" fill="#c94c4c"/>',
  '<circle cx="50" cy="12" r="2.5" fill="#d4af37"/>',
  '</svg>'
].join('');

var quotes = [
  "Every second brings me closer to celebrating the masterpiece that is you",
  "Some stories are written in books... ours is written in the night sky",
  "This quiet night is patiently waiting to see your smile",
  "The stars are rehearsing their light for your birthday",
  "Every silent heartbeat whispers your name into the dark",
  "A little more patience... then the magic unfolds",
  "The moon promised to shine brighter just for you tonight",
  "In a world full of noise, your love is my favorite quiet place",
  "Time moves softly when I think of how far we have come",
  "You are the poem I never knew how to write",
  "If I had a flower for every time I thought of you, I could walk in my garden forever",
  "Loving you feels as effortless as breathing",
  "The universe spent a long time crafting someone as gentle as you",
  "You are my favorite melody in a silent world",
  "Home is not a place anymore... it is wherever you are standing",
  "With you, every ordinary moment feels like soft poetry",
  "You carry a grace that turns dark nights into golden mornings",
  "My heart knew you long before my eyes ever met yours",
  "You are the light that turns simple darkness into starshine",
  "In every lifetime, my soul would still search for yours",
  "Your smile is my favorite piece of artwork",
  "The softest peace I have ever known is found in your presence",
  "You make this journey feel endlessly beautiful",
  "Distance and time mean nothing when someone means everything",
  "You hold my hand, but you have always held my soul",
  "To love you is to know what peace truly feels like",
  "Every road looks beautiful when I walk beside me",
  "You are my midnight wish that came true",
  "I see forever every time I look into your eyes",
  "You bring warmth to even the coldest days",
  "Your voice is my favorite comfort in the dark",
  "In your eyes, I found a home I never want to leave",
  "You are the calm after every storm I have faced",
  "My heart beats in rhythm with yours",
  "No treasure could ever match the worth of your gentle smile",
  "You are the quiet magic that makes everything make sense",
  "Life made complete sense the moment you walked into mine",
  "With you, even silence feels full of love",
  "You are the sweetest chapter in my life story",
  "Every sunset feels richer when shared with you",
  "You are my sun, my moon, and all my stars",
  "Love is not something you find... it is something you build with care",
  "Thank you for being my anchor in a changing world",
  "You bring beauty to the simplest of moments",
  "My favorite place in the world is right beside you",
  "You are the dream I never want to wake up from",
  "Your kindness shines brighter than any star above",
  "You are my peace, my home, and my favorite thought",
  "Forever will never be long enough with you",
  "Happy moments feel endless whenever you are here",
  "You are the sweetest gift life has ever given me",
  "Tonight, the sky celebrates the soft beauty of your soul"
];

// 7 MEMORIES LIST
var memories = [
  { title: "Safe Place", type: "image", src: "assets/photos/1.jpg", note: "Home is not always a place... sometimes, it is a person.", roseCount: 1 },
  { title: "My Little Protection", type: "image", src: "assets/photos/2.jpg", note: "If I can protect you from the little things today, I will always try to protect your smile tomorrow.", roseCount: 2 },
  { title: "Walking Together", type: "image", src: "assets/photos/3.jpg", note: "Every road feels beautiful when I am walking beside you.", roseCount: 3 },
  { title: "My Favorite Arm Candy", type: "image", src: "assets/photos/4.jpg", note: "You hold my arm... but you have always held my heart.", roseCount: 4 },
  { title: "The Rose", type: "image", src: "assets/photos/5.jpg", note: "The rose may not last forever... but seeing you smile because of it is a memory I'll never lose. ⭐", roseCount: 5 },
  { title: "Our Cute Little Fights", type: "video", src: "assets/videos/6.mp4", note: "Even when we're fighting over the smallest little things...", secondNote: "I wouldn't trade these moments with you for the world. 🥺❤️", roseCount: 6 },
  { title: "Closer than words", type: "image", src: "assets/photos/7.jpg", note: "Some moments don't need words... They simply become memories that stay in our hearts forever.", roseCount: 7 }
];

var fullLetterText = "Before this little journey of expressing my love comes to an end, there is something my heart wants to tell you.\n\nI know I am not perfect. I know I make mistakes, we argue, and sometimes I hurt you with my words.\n\nBut every argument teaches me one thing—not how to love you less, but how to love you better. It reminds me to understand you more, care for you more, and become a better man for you.\n\nEverything in life can change, but one thing never will...\n\nMy love for you.\n\nIt will never become smaller. It will only grow bigger with every smile, every challenge, and every moment we share together.\n\nIt is impossible not to love someone with a soul as beautiful as yours.\n\nYou are the best daughter, the best sister, the best friend, and the most amazing life partner I could ever ask for.\n\nThank you for being my peace, my happiness, and my favorite person.\n\nHappy Birthday, my beautiful Vaiduuuu.\n\nI love you 3000.";

var currentSceneIndex = 1;
var memoryIndex = 0;
var quoteIndex = 0;
var countdownInterval;
var continuousPopperInterval = null;

var isTransitioning = false; // PREVENTS DOUBLE SKIPPING FROM TV REMOTE REPEAT CLICKS

var headerClickCount = 0;
var headerClickTimer = null;

var skyCanvas, skyCtx;
var stars = [];
var petals = [];

function initSkyCanvas() {
  skyCanvas = document.getElementById("sky-canvas");
  if (!skyCanvas) return;
  skyCtx = skyCanvas.getContext("2d");
  resizeSky();

  stars = [];
  for (var i = 0; i < 220; i++) {
    stars.push({
      x: Math.random() * skyCanvas.width,
      y: Math.random() * skyCanvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.012 + 0.003
    });
  }

  // RED ROSE PETALS
  petals = [];
  for (var j = 0; j < 22; j++) {
    petals.push({
      x: Math.random() * skyCanvas.width,
      y: Math.random() * skyCanvas.height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.5 - 0.75
    });
  }

  requestAnimationFrame(renderSky);
}

function resizeSky() {
  if (skyCanvas) {
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight;
  }
}
window.addEventListener("resize", resizeSky);

function renderSky() {
  if (!skyCtx) return;
  skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
  skyCtx.fillStyle = "#030305";
  skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

  var moonX = skyCanvas.width * 0.85;
  var moonY = skyCanvas.height * 0.18;
  var moonRadius = 38;

  var moonGlow = skyCtx.createRadialGradient(moonX, moonY, moonRadius, moonX, moonY, 140);
  moonGlow.addColorStop(0, "rgba(244, 232, 193, 0.45)");
  moonGlow.addColorStop(0.3, "rgba(212, 175, 55, 0.12)");
  moonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  skyCtx.fillStyle = moonGlow;
  skyCtx.beginPath(); skyCtx.arc(moonX, moonY, 140, 0, Math.PI * 2); skyCtx.fill();

  var moonGrad = skyCtx.createRadialGradient(moonX - 12, moonY - 12, 5, moonX, moonY, moonRadius);
  moonGrad.addColorStop(0, "#ffffff");
  moonGrad.addColorStop(0.6, "#e2d7c5");
  moonGrad.addColorStop(1, "#b5a38a");

  skyCtx.fillStyle = moonGrad;
  skyCtx.beginPath(); skyCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2); skyCtx.fill();

  var craters = [
    { x: -10, y: -8, r: 9, a: 0.18 },
    { x: 12, y: 10, r: 14, a: 0.2 },
    { x: -15, y: 12, r: 7, a: 0.15 },
    { x: 8, y: -16, r: 6, a: 0.15 },
    { x: 2, y: 4, r: 11, a: 0.16 }
  ];

  for (var c = 0; c < craters.length; c++) {
    var cr = craters[c];
    skyCtx.fillStyle = "rgba(75, 65, 55, " + cr.a + ")";
    skyCtx.beginPath();
    skyCtx.arc(moonX + cr.x, moonY + cr.y, cr.r, 0, Math.PI * 2);
    skyCtx.fill();
  }

  var shadowGrad = skyCtx.createRadialGradient(moonX + 10, moonY + 10, 15, moonX, moonY, moonRadius);
  shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
  shadowGrad.addColorStop(1, "rgba(10,8,12,0.4)");
  skyCtx.fillStyle = shadowGrad;
  skyCtx.beginPath(); skyCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2); skyCtx.fill();

  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
    skyCtx.fillStyle = "rgba(255, 255, 255, " + Math.abs(s.alpha) + ")";
    skyCtx.beginPath(); skyCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); skyCtx.fill();
  }

  // RED ROSE PETALS FALLING
  for (var k = 0; k < petals.length; k++) {
    var p = petals[k];
    p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotSpeed;
    if (p.y > skyCanvas.height) p.y = -10;
    if (p.x > skyCanvas.width) p.x = 0;
    if (p.x < 0) p.x = skyCanvas.width;

    skyCtx.save();
    skyCtx.translate(p.x, p.y);
    skyCtx.rotate((p.rotation * Math.PI) / 180);
    skyCtx.fillStyle = "rgba(180, 20, 50, 0.75)";
    skyCtx.beginPath();
    skyCtx.ellipse(0, 0, p.size, p.size / 1.6, 0, 0, Math.PI * 2);
    skyCtx.fill();
    skyCtx.restore();
  }

  requestAnimationFrame(renderSky);
}

var fxCanvas, fxCtx;
var fireworks = [];

function initFxCanvas() {
  fxCanvas = document.getElementById("fx-canvas");
  if (!fxCanvas) return;
  fxCtx = fxCanvas.getContext("2d");
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
  requestAnimationFrame(renderFx);
}

function launchFireworkTriple() {
  if (!fxCanvas) return;
  
  var positionsX = [fxCanvas.width * 0.25, fxCanvas.width * 0.5, fxCanvas.width * 0.75];
  
  for (var p = 0; p < positionsX.length; p++) {
    var originX = positionsX[p] + (Math.random() * 60 - 30);
    var originY = Math.random() * (fxCanvas.height * 0.4) + fxCanvas.height * 0.2;
    var count = 35;

    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 / count) * i;
      var speed = Math.random() * 2.2 + 0.8;
      fireworks.push({
        x: originX, y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.035,
        alpha: 1,
        color: "hsl(" + (Math.random() * 50 + 25) + ", 85%, 65%)"
      });
    }
  }
}

function renderFx() {
  if (!fxCtx) return;
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  for (var i = fireworks.length - 1; i >= 0; i--) {
    var f = fireworks[i];
    f.x += f.vx; 
    f.y += f.vy; 
    f.vy += f.gravity;
    f.vx *= 0.98;
    f.alpha -= 0.006;
    
    if (f.alpha <= 0) {
      fireworks.splice(i, 1);
    } else {
      fxCtx.fillStyle = f.color;
      fxCtx.globalAlpha = f.alpha;
      fxCtx.beginPath(); fxCtx.arc(f.x, f.y, 2.8, 0, Math.PI * 2); fxCtx.fill();
    }
  }
  fxCtx.globalAlpha = 1;
  requestAnimationFrame(renderFx);
}

var roseCanvas, roseCtx;
var gardenRoses = [];
var isRoamingMode = false;

function initRoseGarden() {
  roseCanvas = document.getElementById("rose-garden-canvas");
  if (!roseCanvas) return;
  roseCtx = roseCanvas.getContext("2d");
  roseCanvas.width = window.innerWidth;
  roseCanvas.height = window.innerHeight;
  requestAnimationFrame(animateGarden);
}

function renderGardenRoses(count) {
  isRoamingMode = false;
  gardenRoses = [];
  var spacing = roseCanvas.width / (count + 1);
  for (var i = 1; i <= count; i++) {
    gardenRoses.push({
      x: spacing * i,
      y: roseCanvas.height - 20,
      targetX: spacing * i,
      targetY: roseCanvas.height - 20,
      scale: 0,
      targetScale: 1,
      sway: Math.random() * Math.PI * 2
    });
  }
}

function gatherRosesToCenter() {
  isRoamingMode = false;
  var centerX = roseCanvas.width / 2;
  var centerY = roseCanvas.height / 2 + 50;

  for (var i = 0; i < gardenRoses.length; i++) {
    var r = gardenRoses[i];
    r.targetX = centerX + (Math.random() * 160 - 80);
    r.targetY = centerY + (Math.random() * 120 - 60);
    r.targetScale = 1.3;
  }
}

// RANDOM ROAMING & COLLISION DUPLICATION SYSTEM
function startRosesRoamingAndDuplicating() {
  isRoamingMode = true;
  gardenRoses = [];
  var initialCount = 8;

  for (var i = 0; i < initialCount; i++) {
    gardenRoses.push({
      x: Math.random() * (roseCanvas.width - 200) + 100,
      y: Math.random() * (roseCanvas.height - 200) + 100,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      scale: 0.8,
      lastDuplicateTime: 0
    });
  }
}

function animateGarden() {
  if (!roseCtx || !roseCanvas) return;
  roseCtx.clearRect(0, 0, roseCanvas.width, roseCanvas.height);

  if (isRoamingMode) {
    var now = Date.now();
    var newRoses = [];

    for (var i = 0; i < gardenRoses.length; i++) {
      var r1 = gardenRoses[i];

      r1.x += r1.vx;
      r1.y += r1.vy;

      // Bounce off screen edges
      if (r1.x < 60 || r1.x > roseCanvas.width - 60) r1.vx *= -1;
      if (r1.y < 60 || r1.y > roseCanvas.height - 60) r1.vy *= -1;

      // Check collision with other roses to trigger duplication
      for (var j = i + 1; j < gardenRoses.length; j++) {
        var r2 = gardenRoses[j];
        var dx = r2.x - r1.x;
        var dy = r2.y - r1.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 65 && (now - r1.lastDuplicateTime > 1500) && (now - r2.lastDuplicateTime > 1500) && gardenRoses.length + newRoses.length < 40) {
          r1.lastDuplicateTime = now;
          r2.lastDuplicateTime = now;

          r1.vx *= -1;
          r1.vy *= -1;
          r2.vx *= -1;
          r2.vy *= -1;

          newRoses.push({
            x: (r1.x + r2.x) / 2 + (Math.random() * 20 - 10),
            y: (r1.y + r2.y) / 2 + (Math.random() * 20 - 10),
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            scale: 0.8,
            lastDuplicateTime: now
          });
        }
      }

      drawSingleProceduralRose(r1.x, r1.y, r1.scale);
    }

    if (newRoses.length > 0) {
      gardenRoses = gardenRoses.concat(newRoses);
    }
  } else {
    for (var k = 0; k < gardenRoses.length; k++) {
      var gr = gardenRoses[k];
      if (gr.scale < gr.targetScale) gr.scale += 0.015;
      
      gr.x += (gr.targetX - gr.x) * 0.08;
      gr.y += (gr.targetY - gr.y) * 0.08;

      gr.sway += 0.02;
      var swayOffset = Math.sin(gr.sway) * 6;

      drawSingleProceduralRose(gr.x + swayOffset, gr.y, gr.scale);
    }
  }

  requestAnimationFrame(animateGarden);
}

function drawSingleProceduralRose(x, y, scale) {
  if (scale <= 0) return;
  roseCtx.save();
  roseCtx.translate(x, y);
  roseCtx.scale(scale, scale);

  roseCtx.beginPath();
  roseCtx.moveTo(0, 0);
  roseCtx.quadraticCurveTo(-10, -50, 0, -90);
  roseCtx.strokeStyle = "#1b4332";
  roseCtx.lineWidth = 3.5;
  roseCtx.stroke();

  roseCtx.fillStyle = "#2d6a4f";
  roseCtx.beginPath();
  roseCtx.ellipse(-12, -45, 14, 6, -Math.PI / 4, 0, Math.PI * 2);
  roseCtx.fill();

  roseCtx.beginPath();
  roseCtx.ellipse(12, -65, 14, 6, Math.PI / 4, 0, Math.PI * 2);
  roseCtx.fill();

  var petalColors = ["#581845", "#900c3f", "#c70039", "#e8b4b8", "#f4e8c1"];
  var petalCenterY = -95;

  for (var rad = 22; rad >= 6; rad -= 4) {
    roseCtx.fillStyle = petalColors[Math.floor(rad / 5)];
    roseCtx.beginPath();
    roseCtx.arc(0, petalCenterY, rad, 0, Math.PI * 2);
    roseCtx.fill();
  }

  roseCtx.restore();
}

// MUSIC TRIGGER WITH AUTOMATIC INFINITE LOOP ENABLED
function triggerBirthdayMusic() {
  var bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.loop = true; // Song loops indefinitely
    bgMusic.volume = 0.8;
    var p = bgMusic.play();
    if (p !== undefined) {
      p.catch(function(e) { console.warn("Audio blocked or missing:", e); });
    }
  }
}

function pauseBirthdayMusic() {
  var bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.pause();
  }
}

/* ==========================================================================
   DEVELOPER MODAL & HEADING CLICK TRIGGER
   ========================================================================== */
function attachDevMenuTrigger() {
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('hero-name') || e.target.closest('.hero-name')) {
      headerClickCount++;
      clearTimeout(headerClickTimer);

      if (headerClickCount >= 3) {
        headerClickCount = 0;
        openDevModal();
      } else {
        headerClickTimer = setTimeout(function() {
          headerClickCount = 0;
        }, 1000);
      }
    }
  });

  // Shift + D keyboard shortcut trigger
  document.addEventListener("keydown", function(e) {
    if (e.shiftKey && (e.key === "D" || e.key === "d")) {
      e.preventDefault();
      openDevModal();
    }
  });
}

function openDevModal() {
  var modal = document.getElementById("dev-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "dev-modal";
    modal.className = "dev-modal-overlay";
    modal.innerHTML = [
      '<div class="dev-modal-content glass-card">',
      '<div class="dev-modal-header">',
      '<h3>Developer Jump Menu</h3>',
      '<button class="dev-close-btn" onclick="closeDevModal()">&times;</button>',
      '</div>',
      '<div class="dev-grid">',
      '<button onclick="jumpToStage(1)">1. Countdown Stage</button>',
      '<button onclick="jumpToStage(2)">2. Real Cake Wish Screen</button>',
      '<button onclick="jumpToStage(3)">3. Virtual Cake Stage</button>',
      '<button onclick="jumpToStage(4)">4. Memory 1: Safe Place</button>',
      '<button onclick="jumpToStage(5)">5. Memory 2: My Little Protection</button>',
      '<button onclick="jumpToStage(6)">6. Memory 3: Walking Together</button>',
      '<button onclick="jumpToStage(7)">7. Memory 4: Favorite Arm Candy</button>',
      '<button onclick="jumpToStage(8)">8. Memory 5: The Rose</button>',
      '<button onclick="jumpToStage(9)">9. Memory 6: Cute Fights (Video)</button>',
      '<button onclick="jumpToStage(10)">10. Memory 7: Closer Than Words</button>',
      '<button onclick="jumpToStage(11)">11. Fountain Pen Letter</button>',
      '<button onclick="jumpToStage(12)">12. Final Surprise</button>',
      '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);
  }
  modal.style.display = "flex";
  focusActiveTVButton();
}

function closeDevModal() {
  var modal = document.getElementById("dev-modal");
  if (modal) modal.style.display = "none";
  focusActiveTVButton();
}

function jumpToStage(stage) {
  closeDevModal();
  isTransitioning = false;
  if (stage === 1) countdownScene();
  else if (stage === 2) realWorldCakeWishScene();
  else if (stage === 3) midnightRevealSequence();
  else if (stage >= 4 && stage <= 10) renderMemoryScene(stage - 4);
  else if (stage === 11) renderLetterEnvelopeScene();
  else if (stage === 12) renderProposalScene();
}

/* ==========================================================================
   TV D-PAD NAVIGATION ENHANCEMENT
   ========================================================================== */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.keyCode === 13 || e.key === "Select" || e.keyCode === 65293 || e.key === " ") {
    var activeBtn = document.activeElement;
    if (activeBtn && (activeBtn.tagName === "BUTTON" || activeBtn.classList.contains("storybook-btn"))) {
      e.preventDefault();
      activeBtn.click();
      return;
    } else {
      var btn = document.querySelector(".storybook-btn:not([style*='display: none'])");
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    }
  }

  if (e.key === "ArrowDown" || e.keyCode === 40) window.scrollBy({ top: 100, behavior: "smooth" });
  if (e.key === "ArrowUp" || e.keyCode === 38) window.scrollBy({ top: -100, behavior: "smooth" });
});

function focusActiveTVButton() {
  setTimeout(function() {
    var btn = document.querySelector(".storybook-btn:not([style*='display: none']), .dev-grid button");
    if (btn) {
      btn.focus();
    }
  }, 250);
}

document.addEventListener("DOMContentLoaded", function() {
  initSkyCanvas();
  initFxCanvas();
  initRoseGarden();
  attachDevMenuTrigger();
  playCinematicIntro();
});

function playCinematicIntro() {
  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = '<div id="intro-box" class="intro-text-screen">' + BRAND_LOGO_SVG + '<div>Made By Tissue</div></div>';
  var box = document.getElementById("intro-box");

  setTimeout(function() { if (box) box.classList.add("show"); }, 500);

  setTimeout(function() {
    if (!box) return;
    box.classList.remove("show");
    setTimeout(function() {
      box.innerHTML = "<div>Tushar Presents</div>";
      box.classList.add("show");
    }, 1500);
  }, 3500);

  setTimeout(function() {
    if (!box) return;
    box.classList.remove("show");
    setTimeout(function() {
      box.innerHTML = "<div>A Birthday Experience For</div>";
      box.classList.add("show");
    }, 1500);
  }, 6500);

  setTimeout(function() {
    if (!box) return;
    box.classList.remove("show");
    setTimeout(function() {
      box.innerHTML = '<span class="hero-name" style="font-size:clamp(3.5rem, 8vw, 7rem); cursor:pointer;">Vaiduuuu</span>';
      box.classList.add("show");
    }, 1500);
  }, 9500);

  setTimeout(function() {
    if (box) box.classList.remove("show");
    setTimeout(function() {
      countdownScene();
    }, 1800);
  }, 12800);
}

function countdownScene() {
  currentSceneIndex = 1;
  window.scrollTo(0, 0);
  if (continuousPopperInterval) clearInterval(continuousPopperInterval);

  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="glass-card">',
    BRAND_LOGO_SVG,
    '<h1 class="hero-name" style="font-size:clamp(2rem, 4.5vw, 3.6rem); cursor:pointer;">This Is My Heart, In A Different Form 💓</h1>',
    '<p class="hero-title">Just a Few Moments Left Until Your Special Day ⭐</p>',
    '<div class="timer-grid">',
    '<div class="timeCard"><span id="days">00</span><p>Days</p></div>',
    '<div class="timeCard"><span id="hours">00</span><p>Hours</p></div>',
    '<div class="timeCard"><span id="mins">00</span><p>Mins</p></div>',
    '<div class="timeCard"><span id="secs">00</span><p>Secs</p></div>',
    '</div>',
    '<p id="quote" class="romantic-quote">' + quotes[0] + '</p>',
    '</div>',
    '</section>'
  ].join('');

  setInterval(function() {
    var q = document.getElementById("quote");
    if (q) {
      q.style.opacity = "0";
      setTimeout(function() {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        q.innerHTML = quotes[quoteIndex];
        q.style.opacity = "1";
      }, 5000);
    }
  }, 20000);

  countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var distance = birthdayTarget - now;
    if (distance <= 0) {
      clearInterval(countdownInterval);
      setTimeout(function() { realWorldCakeWishScene(); }, 1500);
      return;
    }
    var d = Math.floor(distance / (1000 * 60 * 60 * 24));
    var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var s = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
      document.getElementById("days").innerText = d < 10 ? "0" + d : d;
      document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
      document.getElementById("mins").innerText = m < 10 ? "0" + m : m;
      document.getElementById("secs").innerText = s < 10 ? "0" + s : s;
    }
  }, 1000);
}

// 12 AM MIDNIGHT REAL-WORLD CAKE CELEBRATION SCREEN
function realWorldCakeWishScene() {
  currentSceneIndex = 2;
  window.scrollTo(0, 0);

  if (continuousPopperInterval) clearInterval(continuousPopperInterval);
  launchFireworkTriple();
  continuousPopperInterval = setInterval(function() {
    launchFireworkTriple();
  }, 3500);

  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="glass-card" style="padding: 2.5rem; text-align: center;">',
    BRAND_LOGO_SVG,
    '<h1 class="hero-name" style="font-size: clamp(2.2rem, 5vw, 4rem); cursor:pointer; margin-bottom: 1rem;">Happy 22nd Birthday Baby Don! 🎉✨</h1>',
    '<p class="hero-title" style="font-size: clamp(1.4rem, 2.8vw, 2.2rem); color: #f4e8c1; margin-bottom: 2rem; line-height: 1.5;">Cut the real-world cake first with your friends! 🎂🎂</p>',
    '<button class="storybook-btn glow-pink" id="real-cake-cut-btn" onclick="midnightRevealSequence()">I Have Cut The Cake 🎂</button>',
    '</div>',
    '</section>'
  ].join('');

  focusActiveTVButton();
}

function midnightRevealSequence() {
  currentSceneIndex = 3;
  window.scrollTo(0, 0);

  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="glass-card">',
    BRAND_LOGO_SVG,
    '<h1 class="hero-name" style="cursor:pointer;">Happy 22nd Birthday My Beautiful Vaiduuuu</h1>',
    '<p class="hero-subtitle" id="cake-instruction-text" style="font-size: clamp(1.2rem, 2.5vw, 1.8rem); color: #f4e8c1; margin-bottom: 1rem;">Blow the candles & make a wish! ✨</p>',
    '<div class="cake-wrapper">',
    '<svg class="svg-knife" id="knife-svg" viewBox="0 0 100 100">',
    '<path d="M 20 80 L 70 30 L 80 40 L 30 90 Z" fill="#c0c0c0" stroke="#7f8c8d" stroke-width="1.5"/>',
    '<path d="M 10 90 L 25 75 L 35 85 L 20 100 Z" fill="#581845"/>',
    '</svg>',
    '<div class="plate"></div>',
    '<div class="cake" id="cake-body">',
    '<div class="cake-half left">',
    '<div class="cake-layer cake-layer-1"></div>',
    '<div class="cake-layer cake-layer-2"></div>',
    '<div class="cake-layer cake-layer-3"></div>',
    '<div class="embedded-candle pos-left-1"><div class="candle-flame"></div><div class="candle-smoke"></div></div>',
    '<div class="embedded-candle pos-left-2"><div class="candle-flame"></div><div class="candle-smoke"></div></div>',
    '</div>',
    '<div class="cake-half right">',
    '<div class="cake-layer cake-layer-1"></div>',
    '<div class="cake-layer cake-layer-2"></div>',
    '<div class="cake-layer cake-layer-3"></div>',
    '<div class="embedded-candle pos-right-1"><div class="candle-flame"></div><div class="candle-smoke"></div></div>',
    '<div class="embedded-candle pos-right-2"><div class="candle-flame"></div><div class="candle-smoke"></div></div>',
    '</div>',
    '</div>',
    '</div>',
    '<button class="storybook-btn" id="blow-candles-btn" onclick="handleCandleBlow()">Blow Candles 🕯️</button>',
    '<button class="storybook-btn" id="cut-cake-btn" style="display:none;" onclick="handleCakeCut()">I Have Cut My Cake 🎂</button>',
    '</div>',
    '</section>'
  ].join('');

  focusActiveTVButton();
}

function handleCandleBlow() {
  var flames = document.querySelectorAll(".candle-flame");
  var smokes = document.querySelectorAll(".candle-smoke");
  flames.forEach(function(f) { f.classList.add("extinguished"); });
  smokes.forEach(function(s) { s.classList.add("active"); });

  var blowBtn = document.getElementById("blow-candles-btn");
  var cutBtn = document.getElementById("cut-cake-btn");
  var txt = document.getElementById("cake-instruction-text");

  if (blowBtn) blowBtn.style.display = "none";
  if (cutBtn) cutBtn.style.display = "inline-block";
  if (txt) txt.innerText = "Now cut your birthday cake! 🎂";

  focusActiveTVButton();
}

function handleCakeCut() {
  if (isTransitioning) return;
  isTransitioning = true;

  triggerBirthdayMusic();

  var knife = document.getElementById("knife-svg");
  if (knife) knife.classList.add("slice");

  setTimeout(function() {
    var cake = document.getElementById("cake-body");
    if (cake) cake.classList.add("split");

    setTimeout(function() {
      isTransitioning = false;
      renderMemoryScene(0);
    }, 1500);
  }, 600);
}

function renderMemoryScene(idx) {
  memoryIndex = idx;
  if (memoryIndex >= memories.length) {
    triggerBirthdayMusic();
    renderLetterEnvelopeScene();
    return;
  }

  var mem = memories[memoryIndex];
  renderGardenRoses(mem.roseCount || (memoryIndex + 1));

  var app = document.getElementById("app");
  if (!app) return;

  var isVideo = mem.type === "video";

  if (isVideo) {
    pauseBirthdayMusic();
  } else {
    triggerBirthdayMusic();
  }

  // DYNAMIC BUTTON LABELING (OPTION 1)
  var buttonLabel = "Our Next Memory ✨";
  if (memoryIndex === 5) {
    buttonLabel = "Watch Our Memories 🎥";
  } else if (memoryIndex === 6) {
    buttonLabel = "Open My Letter ✉️";
  }

  var mediaTag = isVideo 
    ? '<video id="memory-video" class="polaroid-media" src="' + mem.src + '" controls autoplay loop playsinline></video>'
    : '<img class="polaroid-media" src="' + mem.src + '" alt="' + mem.title + '"/>';

  app.innerHTML = [
    '<section class="scene">',
    '<div class="polaroid-card" id="polaroid-card">',
    '<h2 class="polaroid-title">' + mem.title + '</h2>',
    mediaTag,
    '<p class="polaroid-caption">' + mem.note + '</p>',
    '</div>',
    '<button class="storybook-btn glow-pink" id="next-mem-btn" onclick="nextMemory()">' + buttonLabel + '</button>',
    '</section>'
  ].join('');

  if (isVideo) {
    setTimeout(function() {
      var v = document.getElementById("memory-video");
      if (v) {
        var vp = v.play();
        if (vp !== undefined) {
          vp.catch(function(err) { console.warn("Video play error:", err); });
        }
      }
    }, 200);
  }

  focusActiveTVButton();
}

function nextMemory() {
  if (isTransitioning) return;
  isTransitioning = true;

  var card = document.getElementById("polaroid-card");
  if (card) card.classList.add("shatter");

  setTimeout(function() {
    renderMemoryScene(memoryIndex + 1);
    isTransitioning = false;
  }, 750);
}

function renderLetterEnvelopeScene() {
  gatherRosesToCenter();
  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="glass-card">',
    '<div class="envelope-wrapper">',
    '<div class="envelope" id="envelope">',
    '<div class="envelope-flap"></div>',
    '<div class="wax-seal">V</div>',
    '</div>',
    '</div>',
    '<button class="storybook-btn" id="open-letter-btn" onclick="openLetter()">Open Letter</button>',
    '</div>',
    '</section>'
  ].join('');

  focusActiveTVButton();
}

function openLetter() {
  if (isTransitioning) return;
  isTransitioning = true;

  var env = document.getElementById("envelope");
  if (env) env.classList.add("open");

  setTimeout(function() {
    isTransitioning = false;
    renderLetterWritingScene();
  }, 1000);
}

function renderLetterWritingScene() {
  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="parchment-card">',
    '<div id="pen-text" class="pen-writing-container"></div>',
    '<div id="letter-sig" class="letter-signature" style="display:none;">Always Yours ❤️</div>',
    '</div>',
    '<button class="storybook-btn" id="proposal-btn" style="display:none; margin-top:2rem;" onclick="renderProposalScene()">Continue</button>',
    '</section>'
  ].join('');

  var penContainer = document.getElementById("pen-container");
  if (penContainer) penContainer.style.display = "block";

  var textElem = document.getElementById("pen-text");
  var i = 0;

  function typeChar() {
    if (i < fullLetterText.length) {
      textElem.innerText += fullLetterText.charAt(i);
      i++;
      setTimeout(typeChar, 35);
    } else {
      if (penContainer) penContainer.style.display = "none";
      var sig = document.getElementById("letter-sig");
      var btn = document.getElementById("proposal-btn");
      if (sig) sig.style.display = "block";
      if (btn) btn.style.display = "inline-block";
      focusActiveTVButton();
    }
  }

  typeChar();
}

function renderProposalScene() {
  startRosesRoamingAndDuplicating();

  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = [
    '<section class="scene">',
    '<div class="glass-card" style="min-height: 420px; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; z-index: 10;">',
    '<div id="cinematic-container" class="cinematic-sequence-container" style="text-align: center; width: 100%;">',
    '<p id="seq-line-1" class="fading-line uniform-ending-text" style="display:none;">"Some gifts cannot be wrapped"</p>',
    '<p id="seq-line-2" class="fading-line uniform-ending-text" style="display:none;">"They are meant to be handed over with Love"</p>',
    '<p id="seq-line-3" class="fading-line uniform-ending-text" style="display:none;">"I hope you liked the bag I got for you... 😉❤️"</p>',
    '<p id="seq-line-4" class="fading-line uniform-ending-text" style="display:none;">"And yes one more thing"</p>',
    '<p id="seq-line-5" class="fading-line uniform-ending-text" style="display:none;">"Please turn around and see what your tissue baby got for you"</p>',
    '</div>',
    '</div>',
    '</section>'
  ].join('');

  var line1 = document.getElementById("seq-line-1");
  var line2 = document.getElementById("seq-line-2");
  var line3 = document.getElementById("seq-line-3");
  var line4 = document.getElementById("seq-line-4");
  var line5 = document.getElementById("seq-line-5");

  function showOnlyLine(targetLine, duration) {
    [line1, line2, line3, line4, line5].forEach(function(l) {
      if (l) {
        l.classList.remove("show");
        l.style.opacity = "0";
        setTimeout(function() {
          if (!l.classList.contains("show")) {
            l.style.display = "none";
          }
        }, 1500);
      }
    });

    if (targetLine) {
      targetLine.style.display = "block";
      setTimeout(function() {
        targetLine.classList.add("show");
        targetLine.style.opacity = "1";
      }, 100);

      if (duration) {
        setTimeout(function() {
          targetLine.classList.remove("show");
          targetLine.style.opacity = "0";
          setTimeout(function() {
            targetLine.style.display = "none";
          }, 1500);
        }, duration);
      }
    }
  }

  // Display each line for 6 seconds with smooth fade transitions
  setTimeout(function() { showOnlyLine(line1, 6000); }, 500);
  setTimeout(function() { showOnlyLine(line2, 6000); }, 8200);
  setTimeout(function() { showOnlyLine(line3, 6000); }, 15900);
  setTimeout(function() { showOnlyLine(line4, 6000); }, 23600);
  setTimeout(function() { showOnlyLine(line5, null); }, 31300);
}
