// ==========================================
// 1. FIREBASE INITIALIZATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyA3QEneIiCWwTUZh4LOQsa-hMIBsjJwvDE",
  authDomain: "gamified-learning-69170.firebaseapp.com",
  projectId: "gamified-learning-69170",
  storageBucket: "gamified-learning-69170.firebasestorage.app",
  messagingSenderId: "526009748044",
  appId: "1:526009748044:web:9df7fb4d16ec8c884542e9",
  measurementId: "G-VFGL2X1SEN"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// ==========================================
// 2. GLOBAL DATA & CONFIGURATION
// ==========================================

// --- STORE ITEMS DATABASE ---
const storeItems = [
  // TYPE: FRAMES (Borders)
  { 
    id: "frame_neon",
    name: "Neon Cyber",
    cost: 50,
    class: "frame-neon",
    desc: "A futuristic glowing blue border.",
    type: "frame"
  },
  { 
    id: "frame_gold",
    name: "Golden Glory",
    cost: 200,
    class: "frame-gold",
    desc: "Show off your wealth with gold.",
    type: "frame"
  },
  { 
    id: "frame_fire",
    name: "Inferno",
    cost: 500,
    class: "frame-fire",
    desc: "A blazing border for hot streaks.",
    type: "frame"
  },

  // TYPE: AVATARS (Character Images)
  { 
    id: "avatar_robot",
    name: "Robo-X",
    cost: 100,
    image: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    desc: "Be a smart machine.",
    type: "avatar"
  },
  { 
    id: "avatar_astro",
    name: "Astro Explorer",
    cost: 150,
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995642.png",
    desc: "Explore the universe.",
    type: "avatar"
  },
  { 
    id: "avatar_hero",
    name: "Super Brain",
    cost: 300,
    image: "https://cdn-icons-png.flaticon.com/512/3408/3408455.png",
    desc: "Learning is your superpower.",
    type: "avatar"
  },

  // TYPE: CONSUMABLES (Power-ups)
  { 
    id: "powerup_5050",
    name: "50/50 Lifeline",
    cost: 20,
    class: "powerup-5050",
    desc: "Removes 2 wrong answers in a quiz.",
    type: "consumable"
  }
];

// --- COURSE DATA ---
const courseData = {
  "9":  { title: "Class 9 Foundation",   subjects: "Science, Maths, English",     style: "science", progress: 15 },
  "10": { title: "Class 10 Boards Prep", subjects: "Physics, Chemistry, Maths",   style: "maths",   progress: 40 },
  "11": { title: "Class 11 JEE Prep",    subjects: "Advanced Physics, Maths",     style: "science", progress: 25 },
  "12": { title: "Class 12 Advanced",    subjects: "Calculus, Organic Chemistry", style: "maths",   progress: 10 }
};

// --- LEARNING PATH DATA (For Saga Map) ---
const learningPathData = {
  "9": [
    { label: "The Awakening",          icon: "🌅", rarity: "common",    xp: 10 },
    { label: "Number Ninja Trials",    icon: "🥷", rarity: "rare",      xp: 20 },
    { label: "Force Warrior Arena",    icon: "⚔️", rarity: "rare",      xp: 30 },
    { label: "Atom Breaker’s Lab",     icon: "⚛️", rarity: "epic",      xp: 40 },
    { label: "Energy Forge",           icon: "🔥", rarity: "epic",      xp: 50 },
    { label: "Sonic Tunnel Escape",    icon: "🎧", rarity: "rare",      xp: 60 },
    { label: "Revision Arena",         icon: "🏟️", rarity: "rare",     xp: 70 },
    { label: "Boss Battle: Mastery",   icon: "👑", rarity: "legendary", xp: 80 }
  ],
  "10": [
    { label: "Hero’s Warmup",          icon: "🔥", rarity: "common",    xp: 10 },
    { label: "Alchemy Chamber",        icon: "⚗️", rarity: "rare",      xp: 20 },
    { label: "Mirror Maze",            icon: "🪞", rarity: "rare",      xp: 30 },
    { label: "Power Grid Run",         icon: "🔌", rarity: "epic",      xp: 40 },
    { label: "Magnet Mountain",        icon: "🧲", rarity: "epic",      xp: 50 },
    { label: "Prime Number Temple",    icon: "🏛️", rarity: "rare",     xp: 60 },
    { label: "Board Survival Camp",    icon: "🎯", rarity: "epic",      xp: 70 },
    { label: "Final Trial: Master Orb",icon: "🔮", rarity: "legendary", xp: 80 }
  ],
  "11": [
    { label: "Prodigy Awakening",      icon: "✨", rarity: "common",    xp: 10 },
    { label: "Time Runner Highway",    icon: "⏱️", rarity: "rare",     xp: 20 },
    { label: "Newton’s Dojo",          icon: "🥋", rarity: "rare",     xp: 30 },
    { label: "Energy Vault",           icon: "🔋", rarity: "epic",     xp: 40 },
    { label: "Limit Breaker Shrine",   icon: "🚀", rarity: "epic",     xp: 50 },
    { label: "Trig Summit Trek",       icon: "⛰️", rarity: "rare",     xp: 60 },
    { label: "JEE Arena Mini",         icon: "🏟️", rarity: "epic",     xp: 70 },
    { label: "Legend Battle Sim",      icon: "⚡", rarity: "legendary", xp: 80 }
  ],
  "12": [
    { label: "Champion’s Start",       icon: "🏁", rarity: "common",   xp: 10 },
    { label: "Electro Realm Gate",     icon: "⚡", rarity: "rare",     xp: 20 },
    { label: "Current Core Chamber",   icon: "🌊", rarity: "rare",     xp: 30 },
    { label: "Organic Forge",          icon: "🧪", rarity: "epic",     xp: 40 },
    { label: "Integral Infinity Road", icon: "♾️", rarity: "epic",     xp: 50 },
    { label: "Derivative Dragon Peak", icon: "🐉", rarity: "epic",     xp: 60 },
    { label: "Crash Saga Tower",       icon: "🏰", rarity: "epic",     xp: 70 },
    { label: "Final Boss: Exam Titan", icon: "🗿", rarity: "legendary",xp: 90 }
  ]
};

// --- FALLBACK QUESTIONS (If DB empty) ---
const fallbackQuizQuestions = {
  physics: [
    { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Pascal", "Watt"], correctIndex: 0, xp: 10 },
    { question: "Speed is:", options: ["Distance × Time", "Distance / Time", "Time / Distance", "None"], correctIndex: 1, xp: 10 }
  ],
  chemistry: [
    { question: "Water is a:", options: ["Element", "Compound", "Mixture", "Gas"], correctIndex: 1, xp: 10 },
    { question: "Au is the symbol for:", options: ["Silver", "Gold", "Iron", "Copper"], correctIndex: 1, xp: 10 }
  ],
  maths: [
    { question: "Derivative of x² is:", options: ["x", "2x", "x²", "2"], correctIndex: 1, xp: 10 },
    { question: "Value of π (approx):", options: ["2.14", "3.14", "3.41", "4.13"], correctIndex: 1, xp: 10 }
  ],
  biology: [
    { question: "The basic unit of life is:", options: ["Atom", "Cell", "Tissue", "Organ"], correctIndex: 1, xp: 10 },
    { question: "Powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "DNA"], correctIndex: 1, xp: 10 }
  ]
};

// --- GLOBAL VARIABLES ---
let cachedUserData = null;
let quizQuestionLimit = null;
let bonusAlreadyClaimed = false;
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let earnedXPThisQuiz = 0;
let selectedAnswers = [];
let currentQuizSubject = null;
let xpHistoryChart = null;
let wheelRotation = 0;
let quizTimer = null;
let timeLeft = 20;

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================
function getTodayDateString() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function calculateLevelFromXP(xp) {
  return Math.floor((xp || 0) / 50) + 1;
}

function getLevelProgress(xp) {
  return ((xp || 0) % 50) / 50;
}

function getTierFromXP(xp) {
  const v = xp || 0;
  if (v >= 1000) return "Platinum";
  if (v >= 600)  return "Gold";
  if (v >= 300)  return "Silver";
  if (v >= 100)  return "Bronze";
  return "Rookie";
}

function getBadgeLabelsFromUser(userData) {
  const badges = [];
  const xp = userData.totalXP || 0;
  const streak = userData.streak || 0;
  if (streak >= 3)  badges.push("🔥 3-Day Streak");
  if (streak >= 7)  badges.push("💥 7-Day Streak");
  if (xp >= 100)    badges.push("⭐ 100+ XP");
  if (xp >= 300)    badges.push("🌟 300+ XP");
  if (xp >= 600)    badges.push("👑 600+ XP");
  return badges;
}

function getTodayMissions(userData) {
  const xp = userData.totalXP || 0;
  const streak = userData.streak || 0;
  return [
    { title: "Complete a quiz",   description: "Finish any quiz to earn XP.", done: xp >= 10 },
    { title: "Keep streak alive", description: "Log in and learn today.",     done: streak >= 1 },
    { title: "Reach 50 XP",       description: "Hit 50 XP total.",            done: xp >= 50 }
  ];
}

// ==========================================
// 4. AUTHENTICATION (Signup/Login/Logout)
// ==========================================
const signupForm = document.getElementById("signup-form");
const loginForm  = document.getElementById("login-form");
const logoutBtn  = document.getElementById("logout-button");
const googleBtn  = document.getElementById("google-login-btn");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name      = signupForm["name"].value;
    const email     = signupForm["email"].value;
    const password  = signupForm["password"].value;
    const userClass = signupForm["user-class"].value;
    const mobile    = signupForm["mobile"].value;
    const city      = signupForm["city"].value;
    const today     = getTodayDateString();

    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
          name,
          email,
          userClass,
          mobile,
          city,
          totalXP: 0,
          streak: 1,
          lastLoginDate: today,
          isAdmin: false,
          inventory: [],
          equippedFrame: null,
          equippedAvatar: null,
          lifelines: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => cred.user.updateProfile({ displayName: name }));
      })
      .then(() => {
        alert("Account created! Please login.");
        window.location.href = "login.html";
      })
      .catch(err => alert(err.message));
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      loginForm["email"].value,
      loginForm["password"].value
    )
      .then(() => window.location.href = "dashboard.html")
      .catch(err => alert(err.message));
  });
}

if (googleBtn) {
  const provider = new firebase.auth.GoogleAuthProvider();
  googleBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider)
      .then(async (result) => {
        const user = result.user;
        if (result.additionalUserInfo?.isNewUser) {
          await db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            userClass: "9",
            totalXP: 0,
            streak: 1,
            lastLoginDate: getTodayDateString(),
            isAdmin: false,
            inventory: [],
            equippedFrame: null,
            equippedAvatar: null,
            lifelines: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        window.location.href = "dashboard.html";
      })
      .catch(err => alert(err.message));
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => window.location.href = "login.html");
  });
}

// ==========================================
// 5. AUTH STATE & DASHBOARD UI UPDATES
// ==========================================
auth.onAuthStateChanged(user => {
  const path = window.location.pathname;

  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    userRef.get().then(doc => {
      if (!doc.exists) return;

      const userData = doc.data();
      const today    = getTodayDateString();

      // Daily Streak Logic
      if (userData.lastLoginDate !== today) {
        const newStreak  = (userData.streak || 0) + 1;
        const newTotalXP = (userData.totalXP || 0) + 10; // Login bonus
        userRef.update({
          streak: newStreak,
          lastLoginDate: today,
          totalXP: newTotalXP
        });
        userData.streak  = newStreak;
        userData.totalXP = newTotalXP;
      }
      cachedUserData = userData;

      // Admin Page Protection
      if (path.includes("admin.html")) {
        if (!userData.isAdmin) {
          alert("Not authorized.");
          window.location.href = "dashboard.html";
        } else {
          const el = document.getElementById("admin-display-name");
          if (el) el.textContent = userData.name + " (Admin)";
          initAdminPanel();
        }
      }

      // Dashboard Initialization
      if (path.includes("dashboard.html")) {
        updateDashboardUIFromUserData();
        renderSagaMap(userData.userClass);
        loadPerformanceData();
      }
    });
  } else {
    if (path.includes("dashboard.html") || path.includes("admin.html")) {
      window.location.href = "login.html";
    }
  }
});

function updateDashboardUIFromUserData() {
  if (!cachedUserData) return;

  // 1. Text Info
  const nameEl       = document.getElementById("display-name");
  const welcomeEl    = document.getElementById("welcome-message");
  const streakEl     = document.getElementById("streak-line");
  const courseTitleEl= document.getElementById("nav-course-title");

  if (nameEl)    nameEl.textContent = cachedUserData.name;
  if (welcomeEl) welcomeEl.textContent =
    `Hello ${cachedUserData.name}, ready to learn? 👋`;
  if (streakEl)  streakEl.textContent =
    `🔥 Streak: ${cachedUserData.streak || 0} days • ⭐ Total XP: ${cachedUserData.totalXP || 0}`;
  if (courseTitleEl) {
    const c = courseData[cachedUserData.userClass];
    courseTitleEl.textContent = c ? `📚 ${c.title}` : "";
  }

  // 2. Avatar & Frame Logic
  const avatarImages = document.querySelectorAll(".avatar, .profile-avatar-large");

  let avatarSrc = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
  if (cachedUserData.equippedAvatar) {
    const item = storeItems.find(i => i.id === cachedUserData.equippedAvatar);
    if (item) avatarSrc = item.image;
  }

  let frameClass = "";
  if (cachedUserData.equippedFrame) {
    const item = storeItems.find(i => i.id === cachedUserData.equippedFrame);
    if (item) frameClass = item.class;
  }

  avatarImages.forEach(img => {
    img.src = avatarSrc;
    img.classList.remove("frame-neon", "frame-gold", "frame-fire");
    if (frameClass) img.classList.add(frameClass);
  });

  // 3. Level & Progress
  const xp    = cachedUserData.totalXP || 0;
  const level = calculateLevelFromXP(xp);

  const lvlNum = document.getElementById("level-number");
  const tierLbl= document.getElementById("tier-label");
  const xpProg = document.getElementById("xp-progress-label");
  const lvlRing= document.getElementById("level-ring");

  if (lvlNum)  lvlNum.textContent  = level;
  if (tierLbl) tierLbl.textContent = `${getTierFromXP(xp)} • Level ${level}`;
  if (xpProg)  xpProg.textContent  = `${xp % 50} / 50 XP to next`;
  if (lvlRing) lvlRing.style.setProperty("--level-progress", getLevelProgress(xp));

  // 4. Badges & Missions
  const badgeRow = document.getElementById("badge-row");
  if (badgeRow) {
    const labels = getBadgeLabelsFromUser(cachedUserData);
    badgeRow.innerHTML = labels.length
      ? labels.map(t => `<span class="badge-pill">${t}</span>`).join("")
      : '<span class="badge-pill">No badges yet</span>';
  }

  const missionList = document.getElementById("missions-list");
  if (missionList) {
    const missions = getTodayMissions(cachedUserData);
    missionList.innerHTML = missions.map(m => `
      <div class="mission-card ${m.done ? "mission-done" : ""}">
        <div class="mission-header">
          <span class="mission-status">
            ${m.done ? "✅ Done" : "🕒 Pending"}
          </span>
        </div>
        <h4>${m.title}</h4>
        <p>${m.description}</p>
      </div>
    `).join("");
  }
}

// ==========================================
// 5b. LEARNING PATH (SAGA MAP)
// ==========================================
function renderSagaMap(userClass) {
  const track   = document.getElementById("saga-track");
  const titleEl = document.getElementById("saga-course-title");
  const progEl  = document.getElementById("saga-course-progress");

  if (!track) return;

  const course = courseData[userClass] || null;
  const stages = learningPathData[userClass] || [];

  const totalStages = stages.length || 1;
  const percent     = course ? (course.progress || 0) : 0;
  const currentIndex = Math.round((percent / 100) * (totalStages - 1));

  if (titleEl) titleEl.textContent = course ? course.title : "Your Learning Path";
  if (progEl)  progEl.textContent  = `${percent}% complete`;

  track.innerHTML = "";

  let html = "";
  stages.forEach((stage, idx) => {
    const statusClass =
      idx < currentIndex   ? "completed"
      : idx === currentIndex ? "current"
      : "locked";

    const rarityClass = "rarity-" + (stage.rarity || "common");
    const xpHint      = stage.xp || (10 * (idx + 1));

    html += `
      <div class="saga-node ${statusClass} ${rarityClass}"
           onclick="document.getElementById('nav-quizzes').click()">
        <div class="node-icon">${stage.icon || "⭐"}</div>
        <div class="node-circle">
          <span class="node-level">L${idx + 1}</span>
        </div>
        <div class="node-label">${stage.label}</div>
        <div class="node-xp-hint">~${xpHint} XP</div>
        ${idx === currentIndex ? '<div class="node-flag">You are here</div>' : ""}
      </div>
    `;

    if (idx < totalStages - 1) {
      html += `
        <div class="saga-connector ${idx < currentIndex ? "completed" : ""}"></div>
      `;
    }
  });

  track.innerHTML = html;
  updateSagaComparison(currentIndex, totalStages);
}

function updateSagaComparison(currentIndex, totalStages) {
  const lineEl = document.getElementById("saga-comparison-line");
  if (!lineEl || !cachedUserData) return;

  const myNode = currentIndex + 1;
  lineEl.textContent = `You’re on L${myNode}/${totalStages} in this saga.`;

  db.collection("users")
    .orderBy("totalXP", "desc")
    .limit(1)
    .get()
    .then(snap => {
      if (snap.empty) return;
      const top      = snap.docs[0].data();
      const topXP    = top.totalXP || 0;
      const topLevel = calculateLevelFromXP(topXP);
      const topName  = top.name || "Top learner";
      lineEl.textContent =
        `You’re on L${myNode}/${totalStages} • ` +
        `${topName} is around Level ${topLevel} overall.`;
    })
    .catch(() => {});
}

// ==========================================
// 6. PROFILE MODAL
// ==========================================
const profileModal = document.getElementById("profile-modal");
if (profileModal) {
  const openBtn = document.getElementById("open-profile-modal");
  const closeBtn = profileModal.querySelector(".close-button");
  const pForm = document.getElementById("profile-form");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (!cachedUserData) return;
      const level = calculateLevelFromXP(cachedUserData.totalXP);

      const modalName = document.getElementById("profile-modal-name");
      const pXP       = document.getElementById("profile-xp");
      const pLevel    = document.getElementById("profile-level");
      const pStreak   = document.getElementById("profile-streak");

      if (modalName) modalName.textContent = cachedUserData.name;
      if (pXP)       pXP.textContent       = cachedUserData.totalXP || 0;
      if (pLevel)    pLevel.textContent    = level;
      if (pStreak)   pStreak.textContent   = cachedUserData.streak || 0;

      if (pForm) {
        pForm["profile-name"].value   = cachedUserData.name;
        pForm["profile-mobile"].value = cachedUserData.mobile || "";
        pForm["profile-email"].value  = cachedUserData.email;
        pForm["profile-city"].value   = cachedUserData.city || "";
        pForm["profile-class"].value  = cachedUserData.userClass || "9";
      }

      updateDashboardUIFromUserData();
      profileModal.classList.add("active");
    });
  }

  if (closeBtn) {
    closeBtn.onclick = () => profileModal.classList.remove("active");
  }

  window.addEventListener("click", (e) => {
    if (e.target === profileModal) profileModal.classList.remove("active");
  });

  if (pForm) {
    pForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const updates = {
        name:      pForm["profile-name"].value,
        mobile:    pForm["profile-mobile"].value,
        city:      pForm["profile-city"].value,
        userClass: pForm["profile-class"].value
      };
      db.collection("users").doc(auth.currentUser.uid).update(updates)
        .then(() => {
          auth.currentUser.updateProfile({ displayName: updates.name });
          cachedUserData = { ...cachedUserData, ...updates };
          updateDashboardUIFromUserData();
          renderSagaMap(updates.userClass);
          alert("Profile Updated!");
          profileModal.classList.remove("active");
        });
    });
  }
}

// ==========================================
// 7. NAVIGATION & THEME
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const links    = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll(".content-section");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.id.replace("nav-", "") + "-section";

      sections.forEach(s => s.style.display = "none");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      if (targetId === "leaderboard-section") loadLeaderboard();
      if (targetId === "store-section")       initStore();
    });
  });

  // Subject Card Click
  document.querySelectorAll(".subject-card").forEach(card => {
    card.addEventListener("click", () => {
      const navQuiz = document.getElementById("nav-quizzes");
      if (navQuiz) navQuiz.click();
      const select = document.getElementById("quiz-subject-select");
      if (select) select.value = card.dataset.subject;
    });
  });

  // Theme Switcher
  const toggle     = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  initQuizLogic();
  initBonusWheel();
});

// ==========================================
// 8. QUIZ LOGIC
// ==========================================
function initQuizLogic() {
  const startBtn = document.getElementById("start-quiz-btn");
  const nextBtn  = document.getElementById("next-question-btn");
  const prevBtn  = document.getElementById("prev-question-btn");

  if (!startBtn || !nextBtn || !prevBtn) return;

  // Start quiz + countdown
  startBtn.addEventListener("click", async () => {
    const subjectSelect = document.getElementById("quiz-subject-select");
    const countSelect   = document.getElementById("quiz-question-count");
    if (!subjectSelect || !countSelect) return;

    const subject = subjectSelect.value;
    const qCount  = parseInt(countSelect.value, 10);
    currentQuizSubject = subject;

    if (!cachedUserData) {
      alert("Loading profile...");
      return;
    }

    currentQuestionIndex = 0;
    earnedXPThisQuiz     = 0;
    selectedAnswers      = [];

    try {
      const dbQs = await getQuestionsFromFirestore(subject, cachedUserData.userClass);
      currentQuizQuestions = dbQs.length ? dbQs : fallbackQuizQuestions[subject];
    } catch (e) {
      currentQuizQuestions = fallbackQuizQuestions[subject];
    }

    if (currentQuizQuestions.length > qCount) {
      currentQuizQuestions = currentQuizQuestions.slice(0, qCount);
    }
    selectedAnswers = new Array(currentQuizQuestions.length).fill(null);

    const overlay = document.getElementById("quiz-start-overlay");
    const card    = document.getElementById("quiz-card");
    const countEl = document.getElementById("quiz-countdown");


    // SIMPLE 3 → 2 → 1 → Go! countdown
    if (overlay && card && countEl) {
      overlay.classList.remove("hidden");
      card.classList.add("hidden");

      const steps = [3, 2, 1];
      let index   = 0;

      const runStep = () => {
        if (index < steps.length) {
          countEl.textContent = steps[index];
          index++;
          setTimeout(runStep, 1000);
        } else {
          countEl.textContent = "Go!";
          setTimeout(() => {
            overlay.classList.add("hidden");
            card.classList.remove("hidden");
            renderCurrentQuestion();
          }, 700);
        }
      };

      runStep();
    } else {
      if (card) card.classList.remove("hidden");
      renderCurrentQuestion();
    }
  });

  // NEXT / FINISH BUTTON (important fix)
  nextBtn.onclick = () => {
    if (!currentQuizQuestions.length) return;

    // Last question -> FINISH
    if (currentQuestionIndex === currentQuizQuestions.length - 1) {
      finishQuiz();
      return;
    }

    // Next question
    currentQuestionIndex++;
    renderCurrentQuestion();
  };

  // Previous question
  prevBtn.onclick = () => {
    if (!currentQuizQuestions.length) return;
    if (currentQuestionIndex === 0) return;

    currentQuestionIndex--;
    renderCurrentQuestion();
  };
}

async function getQuestionsFromFirestore(subject, userClass) {
  const snap = await db.collection("questions")
    .where("subject", "==", subject)
    .where("class", "==", userClass)
    .get();

  const qs = [];
  snap.forEach(doc => {
    const d = doc.data();
    if (d.options) {
      qs.push({
        question:     d.question,
        options:      d.options,
        correctIndex: d.correctIndex,
        xp:           d.xp || 10
      });
    }
  });
  return qs;
}

function renderCurrentQuestion() {
  const q = currentQuizQuestions[currentQuestionIndex];
  if (!q) return;

  const qText   = document.getElementById("quiz-question-text");
  const progLbl = document.getElementById("quiz-progress-label");
  const xpLbl   = document.getElementById("quiz-xp-label");
  const bar     = document.getElementById("quiz-progress-bar-inner");
  const fb      = document.getElementById("quiz-feedback");
  const optsList= document.getElementById("quiz-options-list");

  if (!qText || !progLbl || !xpLbl || !bar || !fb || !optsList) return;

  // Reset feedback
  fb.textContent = "";
  fb.style.color = "";

  // Question data
  qText.textContent   = q.question;
  progLbl.textContent = `Question ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`;
  xpLbl.textContent   = `XP: ${q.xp}`;
  bar.style.width     = `${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%`;

  // Clear options
  optsList.innerHTML = "";

  // Create options
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(idx);

    const li = document.createElement("li");
    li.appendChild(btn);
    optsList.appendChild(li);
  });

  const nextBtn = document.getElementById("next-question-btn");
  const prevBtn = document.getElementById("prev-question-btn");

  if (prevBtn && nextBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = selectedAnswers[currentQuestionIndex] === null;

    // TEXT change: Next / Finish Quiz
    nextBtn.textContent =
      currentQuestionIndex === currentQuizQuestions.length - 1
        ? "Finish Quiz"
        : "Next";
  }

  const savedAns = selectedAnswers[currentQuestionIndex];

  if (savedAns !== null) {
    // Already answered earlier
    document.querySelectorAll(".quiz-option-btn").forEach((b, i) => {
      b.disabled = true;
      if (i === q.correctIndex) b.classList.add("correct");
      if (i === savedAns && i !== q.correctIndex) b.classList.add("incorrect");
    });
    fb.textContent = (savedAns === q.correctIndex)
      ? "Correct!"
      : (savedAns === -1 ? "⏳ Time's up (auto-skipped)." : "Incorrect.");
  } else {
    // New question → start timer
    startQuestionTimer();
  }

  const lifeBtn   = document.getElementById("btn-use-5050");
  const lifeCount = document.getElementById("lifeline-count");

  if (lifeBtn && lifeCount && cachedUserData) {
    const count = cachedUserData.lifelines || 0;
    lifeCount.textContent = count;

    if (count > 0 && savedAns === null) {
      lifeBtn.disabled = false;
      lifeBtn.onclick  = useLifeline5050;
    } else {
      lifeBtn.disabled = true;
    }
  }
}

function handleAnswer(idx) {
  clearInterval(quizTimer);

  selectedAnswers[currentQuestionIndex] = idx;
  const q = currentQuizQuestions[currentQuestionIndex];
  if (!q) return;

  const btns = document.querySelectorAll(".quiz-option-btn");
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correctIndex) b.classList.add("correct");
    if (i === idx && i !== q.correctIndex) b.classList.add("incorrect");
  });

  const fb = document.getElementById("quiz-feedback");
  if (fb) {
    fb.textContent = (idx === q.correctIndex) ? "Correct!" : "Incorrect.";
    fb.style.color = (idx === q.correctIndex) ? "#16a34a" : "#e11d48";
  }

  const nextBtn = document.getElementById("next-question-btn");
  if (nextBtn) nextBtn.disabled = false;

  const lifeBtn = document.getElementById("btn-use-5050");
  if (lifeBtn) lifeBtn.disabled = true;
}

// When time ends, auto-mark question & move forward
function autoSkipQuestion() {
  if (selectedAnswers[currentQuestionIndex] !== null) return;

  selectedAnswers[currentQuestionIndex] = -1;

  const fb = document.getElementById("quiz-feedback");
  if (fb) {
    fb.textContent = "⏳ Time's up!";
    fb.style.color = "#f59e0b";
  }

  const btns = document.querySelectorAll(".quiz-option-btn");
  btns.forEach(b => b.disabled = true);

  const lifeBtn = document.getElementById("btn-use-5050");
  if (lifeBtn) lifeBtn.disabled = true;

  const nextBtn = document.getElementById("next-question-btn");
  if (nextBtn) {
    nextBtn.disabled = false;
    setTimeout(() => {
      nextBtn.click();
    }, 700);
  }
}

function useLifeline5050() {
  const btn = document.getElementById("btn-use-5050");
  if (!btn || btn.disabled || !cachedUserData || (cachedUserData.lifelines || 0) <= 0) return;

  db.collection("users").doc(auth.currentUser.uid)
    .update({ lifelines: firebase.firestore.FieldValue.increment(-1) });

  cachedUserData.lifelines--;
  const lifeCount = document.getElementById("lifeline-count");
  if (lifeCount) lifeCount.textContent = cachedUserData.lifelines;

  btn.disabled = true;

  const q    = currentQuizQuestions[currentQuestionIndex];
  const opts = document.querySelectorAll(".quiz-option-btn");
  const wrongIndices = [];
  q.options.forEach((_, i) => { if (i !== q.correctIndex) wrongIndices.push(i); });

  wrongIndices.sort(() => Math.random() - 0.5);
  wrongIndices.slice(0, 2).forEach(idx => {
    if (opts[idx]) opts[idx].style.visibility = "hidden";
  });
}

function finishQuiz() {
  clearInterval(quizTimer);

  earnedXPThisQuiz = 0;
  let correctCount = 0;

  currentQuizQuestions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctIndex) {
      earnedXPThisQuiz += q.xp;
      correctCount++;
    }
  });

  // XP de do
  awardXP(earnedXPThisQuiz);

  // Attempt log karo
  saveQuizAttempt(
    currentQuizSubject || "unknown",
    correctCount,
    currentQuizQuestions.length,
    earnedXPThisQuiz
  );

  // ✅ OVERLAY SHOW KARO (yahi main fix hai)
  const overlay = document.getElementById("quiz-finish-overlay");
  const summary = document.getElementById("quiz-finish-summary");

  if (summary) {
    summary.textContent = `You earned ${earnedXPThisQuiz} XP`;
  }

  if (overlay) {
    overlay.classList.remove("hidden");     // agar tumne hidden class use ki hai
    overlay.style.display = "flex";         // force visible
    overlay.style.opacity = "1";            // smooth dikhne ke liye
  }

  // bonus wheel reset
  bonusAlreadyClaimed = false;
  const spinBtn  = document.getElementById("bonus-spin-btn");
  const resultEl = document.getElementById("bonus-result");
  if (spinBtn)  spinBtn.disabled = false;
  if (resultEl) resultEl.textContent = "Spin for bonus!";

  // leaderboard / chart update
  loadPerformanceData();
}


function initBonusWheel() {
  const spin     = document.getElementById("bonus-spin-btn");
  const skip     = document.getElementById("bonus-skip-btn");
  const ring     = document.querySelector(".quiz-finish-ring");
  const resultEl = document.getElementById("bonus-result");

  const segmentXP = [5, 10, 15, 20, 30, 0];
  const segmentAngle = 360 / segmentXP.length;

  if (spin && ring) {
    spin.onclick = () => {
      if (bonusAlreadyClaimed) return;
      bonusAlreadyClaimed = true;

      spin.disabled = true;
      spin.classList.add("spinning-btn");
      if (resultEl) resultEl.textContent = "Spinning...";

      const extraTurns = 4 + Math.random() * 2;
      const randomAngleWithinCircle = Math.random() * 360;

      const targetRotation =
        wheelRotation + extraTurns * 360 + randomAngleWithinCircle;

      wheelRotation = targetRotation;
      ring.style.transform = `rotate(${targetRotation}deg)`;

      const handleEnd = () => {
        ring.removeEventListener("transitionend", handleEnd);
        spin.classList.remove("spinning-btn");

        let normalized = ((targetRotation % 360) + 360) % 360;
        const pointerAngle = (360 - normalized) % 360;
        const index = Math.floor(pointerAngle / segmentAngle);
        const bonus = segmentXP[index] ?? 0;

        if (resultEl) {
          resultEl.textContent =
            bonus > 0
              ? `You won +${bonus} XP!`
              : "No bonus this time.";
        }

        if (bonus > 0) {
          awardXP(bonus);
        }

        // After spin -> leaderboard
        setTimeout(closeQuizOverlay, 1800);
      };

      ring.addEventListener("transitionend", handleEnd);
    };
  }

  if (skip) {
    skip.onclick = closeQuizOverlay;
  }
}

function closeQuizOverlay() {
  const overlay = document.getElementById("quiz-finish-overlay");
  if (overlay) overlay.classList.add("hidden");
  const navLb = document.getElementById("nav-leaderboard");
  if (navLb) navLb.click();
}

function awardXP(amount) {
  if (amount <= 0 || !auth.currentUser) return;
  db.collection("users").doc(auth.currentUser.uid)
    .update({ totalXP: firebase.firestore.FieldValue.increment(amount) });
  if (cachedUserData) {
    cachedUserData.totalXP = (cachedUserData.totalXP || 0) + amount;
    updateDashboardUIFromUserData();
  }
}

// ==========================================
// 9. LEADERBOARD
// ==========================================
function loadLeaderboard() {
  const tbody      = document.getElementById("leaderboard-body");
  const summaryEl  = document.getElementById("leaderboard-summary");

  if (!tbody) return;
  tbody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";
  if (summaryEl) summaryEl.textContent = "Calculating your rank...";

  db.collection("users")
    .orderBy("totalXP", "desc")
    .limit(10)
    .get()
    .then(snap => {
      let html       = "";
      let rank       = 1;
      let myRankText = null;

      snap.forEach(doc => {
        const d       = doc.data();
        const isMe    = auth.currentUser && auth.currentUser.uid === doc.id;
        const xp      = d.totalXP || 0;
        const level   = calculateLevelFromXP(xp);
        const tier    = getTierFromXP(xp);
        const initial = (d.name && d.name[0]) ? d.name[0].toUpperCase() : "U";

        let rowClass = "leaderboard-row";
        if (isMe) rowClass += " current-user-row";
        if (rank === 1) rowClass += " rank-1";
        if (rank === 2) rowClass += " rank-2";
        if (rank === 3) rowClass += " rank-3";

        if (isMe) {
          myRankText = `You are #${rank} • ${xp} XP • Level ${level} (${tier})`;
        }

        html += `
          <tr class="${rowClass}">
            <td>
              <div class="lb-rank-pill">#${rank}</div>
            </td>
            <td>
              <div class="lb-user-cell">
                <div class="lb-avatar-circle">${initial}</div>
                <div>
                  <div class="lb-name">${d.name || "Unnamed"}</div>
                  <div class="lb-meta">Class ${d.userClass || "-"}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="lb-level-badge">Lv ${level}</span>
            </td>
            <td>
              <span class="lb-xp-pill">${xp} XP</span>
            </td>
          </tr>
        `;
        rank++;
      });

      tbody.innerHTML = html || "<tr><td colspan='4'>No users found.</td></tr>";

      if (summaryEl) {
        summaryEl.textContent = myRankText || "Play quizzes to enter the Top 10!";
      }
    })
    .catch(() => {
      tbody.innerHTML = "<tr><td colspan='4'>Error loading leaderboard.</td></tr>";
      if (summaryEl) summaryEl.textContent = "Unable to load ranks.";
    });
}

// ==========================================
// 10. XP STORE LOGIC
// ==========================================
function initStore() {
  const container = document.getElementById("store-items-container");
  const balanceEl = document.getElementById("store-xp-balance");
  if (!container || !cachedUserData || !balanceEl) return;

  balanceEl.textContent = cachedUserData.totalXP || 0;
  container.innerHTML   = "";

  const inv     = cachedUserData.inventory || [];
  const eqFrame = cachedUserData.equippedFrame;
  const eqAvatar= cachedUserData.equippedAvatar;

  storeItems.forEach(item => {
    const canAfford = (cachedUserData.totalXP || 0) >= item.cost;
    let btnHTML     = "";
    let previewHTML = "";

    if (item.type === "avatar") {
      previewHTML = `<div class="item-preview avatar-type"><img src="${item.image}"></div>`;
    } else if (item.type === "frame") {
      previewHTML = `<div class="item-preview ${item.class}"></div>`;
    } else if (item.type === "consumable") {
      previewHTML = `
        <div class="item-preview"
             style="background:#f6ad55; color:white; display:flex; align-items:center; justify-content:center;">
          ⚡
        </div>`;
    }

    if (item.type === "consumable") {
      btnHTML = canAfford
        ? `<button class="btn-buy" onclick="buyItem('${item.id}', ${item.cost})">Buy (${item.cost} XP)</button>`
        : `<button class="btn-buy" disabled>Need ${item.cost} XP</button>`;
    } else {
      const isOwned    = inv.includes(item.id);
      const isEquipped = (item.type === "frame"  && eqFrame  === item.id) ||
                         (item.type === "avatar" && eqAvatar === item.id);

      if (isEquipped) {
        btnHTML = `<button class="btn-equipped" disabled>Equipped</button>`;
      } else if (isOwned) {
        btnHTML = `<button class="btn-equip" onclick="equipItem('${item.id}')">Equip</button>`;
      } else {
        btnHTML = canAfford
          ? `<button class="btn-buy" onclick="buyItem('${item.id}', ${item.cost})">Buy (${item.cost} XP)</button>`
          : `<button class="btn-buy" disabled>Need ${item.cost} XP</button>`;
      }
    }

    const card = document.createElement("div");
    card.className = "store-item-card";
    card.innerHTML = `
      ${previewHTML}
      <h4>${item.name}</h4>
      <span class="cost">${item.cost} XP</span>
      <p style="font-size:0.8rem; color:#666; margin-bottom:1rem;">${item.desc}</p>
      ${btnHTML}
    `;
    container.appendChild(card);
  });
}

window.buyItem = async function (itemId, cost) {
  if (!confirm(`Spend ${cost} XP?`)) return;

  const item    = storeItems.find(i => i.id === itemId);
  const userRef = db.collection("users").doc(auth.currentUser.uid);

  try {
    const updates = { totalXP: firebase.firestore.FieldValue.increment(-cost) };

    if (item.type === "consumable") {
      updates.lifelines = firebase.firestore.FieldValue.increment(1);
    } else {
      updates.inventory = firebase.firestore.FieldValue.arrayUnion(itemId);
    }

    await userRef.update(updates);

    cachedUserData.totalXP -= cost;
    if (item.type === "consumable") {
      cachedUserData.lifelines = (cachedUserData.lifelines || 0) + 1;
      alert(`Purchased! You now have ${cachedUserData.lifelines} lifelines.`);
    } else {
      if (!cachedUserData.inventory) cachedUserData.inventory = [];
      cachedUserData.inventory.push(itemId);
      alert("Item Added to Inventory!");
    }

    initStore();
    updateDashboardUIFromUserData();
  } catch (e) {
    alert(e.message);
  }
};

window.equipItem = async function (itemId) {
  const item    = storeItems.find(i => i.id === itemId);
  const userRef = db.collection("users").doc(auth.currentUser.uid);
  const updates = {};

  if (item.type === "frame") {
    updates.equippedFrame = itemId;
    cachedUserData.equippedFrame = itemId;
  } else if (item.type === "avatar") {
    updates.equippedAvatar = itemId;
    cachedUserData.equippedAvatar = itemId;
  }

  try {
    await userRef.update(updates);
    alert("Equipped!");
    initStore();
    updateDashboardUIFromUserData();
  } catch (e) {
    alert(e.message);
  }
};

// ==========================================
// 11. ADMIN PANEL
// ==========================================
function initAdminPanel() {
  const form = document.getElementById('admin-question-form');
  if (!form) return;

  // ---- Single question add ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await db.collection('questions').add({
        subject: document.getElementById('admin-subject').value,
        class: document.getElementById('admin-class').value,
        question: document.getElementById('admin-question-text').value,
        options: [
          document.getElementById('admin-option-1').value,
          document.getElementById('admin-option-2').value,
          document.getElementById('admin-option-3').value,
          document.getElementById('admin-option-4').value
        ],
        correctIndex: parseInt(document.getElementById('admin-correct-index').value),
        xp: parseInt(document.getElementById('admin-xp').value) || 10,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Question Added!");
      form.reset();
      loadAdminQuestions();
    } catch (e) {
      alert(e.message);
    }
  });

  const filterSub = document.getElementById('admin-filter-subject');
  const filterCls = document.getElementById('admin-filter-class');
  if (filterSub) filterSub.addEventListener('change', loadAdminQuestions);
  if (filterCls) filterCls.addEventListener('change', loadAdminQuestions);

  loadAdminQuestions();

  const jsonInput  = document.getElementById('json-upload-input');
  const jsonBtn    = document.getElementById('json-upload-btn');
  const jsonStatus = document.getElementById('json-upload-status');

  if (jsonBtn && jsonInput) {
    jsonBtn.addEventListener('click', () => {
      bulkUploadQuestionsFromJSON(jsonInput, jsonStatus);
    });
  }
}

function loadAdminQuestions() {
  const tbody = document.getElementById("admin-questions-body");
  const sub   = document.getElementById("admin-filter-subject").value;
  const cls   = document.getElementById("admin-filter-class").value;
  if (!tbody) return;

  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  db.collection("questions")
    .where("subject", "==", sub)
    .where("class", "==", cls)
    .get()
    .then(snap => {
      let html = "";
      snap.forEach(doc => {
        const d = doc.data();
        html += `
          <tr>
            <td>${d.question}</td>
            <td>${d.subject}</td>
            <td>${d.class}</td>
            <td>${d.xp}</td>
            <td><button onclick="deleteQuestion('${doc.id}')">Delete</button></td>
          </tr>`;
      });
      tbody.innerHTML = html || "<tr><td colspan='5'>No questions.</td></tr>";
    });
}

window.deleteQuestion = async function (id) {
  if (!confirm("Delete?")) return;
  await db.collection("questions").doc(id).delete();
  loadAdminQuestions();
};

// ==========================================
// BULK JSON UPLOAD FOR QUESTIONS
// ==========================================
async function bulkUploadQuestionsFromJSON(fileInput, statusEl) {
  if (!fileInput.files || !fileInput.files[0]) {
    alert("Please choose a .json file first.");
    return;
  }

  const file = fileInput.files[0];

  try {
    if (statusEl) statusEl.textContent = "Reading file...";

    const text = await file.text();
    let data = JSON.parse(text);

    if (!Array.isArray(data)) {
      throw new Error("JSON root must be an array of question objects.");
    }

    const validQuestions = data.filter(q =>
      q &&
      typeof q.subject === "string" &&
      typeof q.class === "string" &&
      typeof q.question === "string" &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctIndex === "number"
    );

    if (!validQuestions.length) {
      throw new Error("No valid question objects found in JSON.");
    }

    if (statusEl) statusEl.textContent =
      `Uploading ${validQuestions.length} questions... (this may take a moment)`;

    const batchSize = 400;
    let uploaded = 0;

    for (let i = 0; i < validQuestions.length; i += batchSize) {
      const slice = validQuestions.slice(i, i + batchSize);
      const batch = db.batch();

      slice.forEach(q => {
        const ref = db.collection("questions").doc();
        batch.set(ref, {
          subject: q.subject,
          class: q.class,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          xp: typeof q.xp === "number" ? q.xp : 10,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      });

      await batch.commit();
      uploaded += slice.length;
      if (statusEl) statusEl.textContent =
        `Uploaded ${uploaded}/${validQuestions.length} questions...`;
    }

    alert(`Uploaded ${uploaded} questions successfully! ✅`);
    if (statusEl) statusEl.textContent = "Done ✔";
    fileInput.value = "";
    loadAdminQuestions();
  } catch (err) {
    console.error("Bulk upload error:", err);
    alert("Upload failed: " + err.message);
    if (statusEl) statusEl.textContent = "Error ❌";
  }
}

// ==========================================
// 12. QUIZ ATTEMPT LOGGING (for analytics)
// ==========================================
function saveQuizAttempt(subject, correct, total, xpEarned) {
  if (!auth.currentUser) return;
  const userRef = db.collection("users").doc(auth.currentUser.uid);

  userRef.collection("quizAttempts").add({
    subject,
    correct,
    total,
    xpEarned,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(err => {
    console.error("Error saving quiz attempt:", err);
  });
}

// ==========================================
// TIMER – PER QUESTION (20 sec)
// ==========================================
function startQuestionTimer() {
  clearInterval(quizTimer);
  timeLeft = 20;

  const fill = document.getElementById("quiz-timer-fill");
  if (fill) fill.style.width = "100%";

  quizTimer = setInterval(() => {
    timeLeft--;

    const bar = document.getElementById("quiz-timer-fill");
    if (bar) {
      bar.style.width = (timeLeft / 20) * 100 + "%";
    }

    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      autoSkipQuestion();
    }
  }, 1000);
}

// ==========================================
// 13. PERFORMANCE INSIGHTS (Graph + Weakness)
// ==========================================
function loadPerformanceData() {
  if (!auth.currentUser) return;

  const userRef = db.collection("users").doc(auth.currentUser.uid);
  userRef.collection("quizAttempts")
    .orderBy("createdAt", "asc")
    .limit(15)
    .get()
    .then(snap => {
      const attempts = [];
      snap.forEach(doc => attempts.push(doc.data()));
      renderXPChart(attempts);
      renderSubjectStrengths(attempts);
    })
    .catch(err => {
      console.error("Error loading performance data:", err);
    });
}

function renderXPChart(attempts) {
  const canvas = document.getElementById("xp-history-chart");
  if (!canvas || typeof Chart === "undefined") return;

  const labels = attempts.map((_, idx) => `Quiz ${idx + 1}`);
  const data   = attempts.map(a => {
    const total = a.total || 1;
    return Math.round((a.correct / total) * 100);
  });

  const ctx = canvas.getContext("2d");
  if (!labels.length) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  if (xpHistoryChart) xpHistoryChart.destroy();

  xpHistoryChart = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Score %",
        data,
        tension: 0.35,
        fill: false,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          title: { display: true, text: "Score (%)" }
        }
      }
    }
  });
}

function renderSubjectStrengths(attempts) {
  const container = document.getElementById("subject-strengths");
  if (!container) return;

  if (!attempts.length) {
    container.innerHTML = `
      <p>Play a few quizzes to unlock your strength & weakness analysis.</p>
    `;
    return;
  }

  const stats = {};
  attempts.forEach(a => {
    const s = a.subject || "unknown";
    if (!stats[s]) stats[s] = { correct: 0, total: 0 };
    stats[s].correct += a.correct || 0;
    stats[s].total   += a.total   || 0;
  });

  const subjectEntries = Object.keys(stats).map(subject => {
    const correct  = stats[subject].correct;
    const total    = stats[subject].total || 1;
    const accuracy = Math.round((correct / total) * 100);
    return { subject, accuracy };
  });

  subjectEntries.sort((a, b) => b.accuracy - a.accuracy);

  const strongest = subjectEntries[0];
  const weakest   = subjectEntries[subjectEntries.length - 1];

  function subjectDisplay(s) {
    if (s === "physics")   return "Physics";
    if (s === "maths")     return "Mathematics";
    if (s === "biology")   return "Biology";
    if (s === "chemistry") return "Organic Chemistry (Chemistry)";
    return s;
  }

  const strongText = strongest
    ? `${subjectDisplay(strongest.subject)} (${strongest.accuracy}% correct)`
    : "N/A";

  const weakText = weakest && weakest.subject !== strongest.subject
    ? `${subjectDisplay(weakest.subject)} (${weakest.accuracy}% correct)`
    : null;

  const weaknessPart = weakText
    ? ` but weaker in <strong>${weakText}</strong>.`
    : ".";

  const listItemsHTML = subjectEntries.map(e => {
    return `
      <li>
        <span class="subject-tag">${subjectDisplay(e.subject)}</span>
        <span class="subject-accuracy">${e.accuracy}% correct</span>
      </li>
    `;
  }).join("");

  container.innerHTML = `
    <p class="strength-summary">
      You are strong in <strong>${strongText}</strong>${weaknessPart}
    </p>
    <ul class="strength-list">
      ${listItemsHTML}
    </ul>
  `;
}
