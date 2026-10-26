
import { useState } from "react";
import {
  Activity, BookHeart, Heart, LayoutDashboard, MessageCircle,
  Settings, Sparkles, Wind, UserRoundSearch, Menu, X,
  ArrowRight, Sun, Moon, Cloud, Coffee, Flower2
} from "lucide-react";
import ChatPage from "./pages/ChatPage";
import MoodPage from "./pages/MoodPage";
import CalmCorner from "./pages/CalmCorner";
import FindSupport from "./pages/FindSupport";
import ReflectionsPage from "./pages/ReflectionsPage";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import { LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "AI Companion", icon: MessageCircle },
  { name: "Mood Tracker", icon: Activity },
  { name: "Calm Corner", icon: Wind },
  { name: "Find Support", icon: UserRoundSearch },
  { name: "My Reflections", icon: BookHeart },
  { name: "Settings", icon: Settings },
];

const moods = [
  { name: "Happy", icon: Sun, color: "#FFF0C9" },
  { name: "Okay", icon: Cloud, color: "#E6E8FF" },
  { name: "Low", icon: Moon, color: "#E9DFFF" },
  { name: "Anxious", icon: Activity, color: "#DCEFF7" },
  { name: "Stressed", icon: Coffee, color: "#FBE1DC" },
];

const features = [
  {
    title: "Talk it out",
    desc: "A gentle space to express what's on your mind.",
    icon: MessageCircle,
    color: "#E8E4FF",
    page: "AI Companion",
  },
  {
    title: "Understand your mood",
    desc: "Notice patterns and learn more about yourself.",
    icon: Activity,
    color: "#DDF2EC",
    page: "Mood Tracker",
  },
  {
    title: "Find your calm",
    desc: "Take a little pause with guided wellness exercises.",
    icon: Flower2,
    color: "#FBE6DF",
    page: "Calm Corner",
  },
  {
    title: "Your growth journal",
    desc: "Keep meaningful reflections and celebrate progress.",
    icon: BookHeart,
    color: "#F7E9B9",
    page: "My Reflections",
  },
];

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedMood, setSelectedMood] = useState("");
  const [savedMood, setSavedMood] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screen, setScreen] = useState(
    () => localStorage.getItem("vc-session") === "active" ? "app" : "landing"
  );
  function chooseMood(mood: string) {
    setSelectedMood(mood);
    setSavedMood(mood);
    localStorage.setItem("vc-latest-mood", mood);
    localStorage.setItem("vc-latest-mood-date", new Date().toISOString());
  }
  if (screen === "landing") {
  return (
    <LandingPage
      onGetStarted={() => setScreen("login")}
      onLogin={() => setScreen("login")}
    />
  );
}

if (screen === "login") {
  return (
    <LoginPage
      onBack={() => setScreen("landing")}
      onLoginSuccess={() => setScreen("app")}
    />
  );
}
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Heart size={23} fill="white" /></div>
          <div>
            <div className="brand-name">Virtual <span>Companion</span></div>
            <div className="brand-caption">YOUR PERSONAL WELLNESS SPACE</div>
          </div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="nav-label">YOUR SPACE</div>
        <nav className="side-nav">
          {navItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => {
                setActivePage(name);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{name}</span>
              {name === "AI Companion" && <span className="online-dot" />}
            </button>
          ))}
        </nav>

 
<div
  className="sidebar-bottom"
  style={{
    flexShrink: 0,
    padding: "16px",
    position: "relative",
    zIndex: 10000,
    background: "#ffffff",
  }}
>
  <div className="mini-quote">
    <Sparkles size={18} />
    <p>You don't have to have it all figured out today.</p>
    <span>ONE DAY AT A TIME ♡</span>
  </div>

  <div className="profile-row">
    <div className="avatar">Y</div>
    <div className="profile-info">
      <strong>Your space</strong>
      <span>Personal wellness</span>
    </div>
    <Settings size={17} className="profile-settings" />
  </div>

  <button
    type="button"
    className="logout-button"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      padding: "12px",
      marginTop: "16px",
      background: "#b94b55",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
    }}
    onClick={() => {
      localStorage.removeItem("vc-session");
      localStorage.removeItem("vc-display-name");
      setScreen("landing");
      setActivePage("Dashboard");
    }}
  >
    <LogOut size={18} />
    <span>Log out</span>
  </button>
</div>


      </aside>

      {mobileMenu && <button className="mobile-overlay" onClick={() => setMobileMenu(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="breadcrumb">Your space <span>/</span> <strong>{activePage}</strong></div>
          <div className="topbar-right">
            <span className="today-label">{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
            <div className="top-avatar">Y</div>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          <div className="page-container">
            <section className="welcome-row">
              <div>
                <div className="eyebrow"><Sparkles size={15} /> A LITTLE SPACE FOR YOU</div>
                <h1>Hey there, <span>beautiful soul.</span></h1>
                <p className="welcome-copy">Take a breath. You're here, and that's a lovely place to start.</p>
              </div>
              <div className="welcome-art" aria-hidden="true">
                <div className="art-sun" />
                <div className="art-plant plant-one">✳</div>
                <div className="art-plant plant-two">✿</div>
                <div className="art-hill hill-one" />
                <div className="art-hill hill-two" />
                <div className="art-heart"><Heart size={27} fill="currentColor" /></div>
              </div>
            </section>

            <section className="mood-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">CHECK IN WITH YOURSELF</div>
                  <h2>How are you feeling today?</h2>
                  <p>There are no right or wrong answers.</p>
                </div>
                <span className="gentle-tag"><Heart size={13} /> Your feelings matter</span>
              </div>

              <div className="mood-grid">
                {moods.map(({ name, icon: Icon, color }) => (
                  <button
                    key={name}
                    className={`mood-card ${selectedMood === name || (!selectedMood && savedMood === name) ? "mood-selected" : ""}`}
                    onClick={() => chooseMood(name)}
                  >
                    <span className="mood-icon" style={{ background: color }}><Icon size={23} strokeWidth={1.7} /></span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
              {savedMood && <div className="mood-feedback"><Heart size={15} /> Thanks for checking in. You marked today's mood as <strong>{savedMood}</strong>. Be gentle with yourself.</div>}
            </section>

            <section className="daily-card">
              <div className="daily-icon"><Sun size={23} /></div>
              <div className="daily-text">
                <span className="daily-label">A THOUGHT FOR TODAY</span>
                <h3>You are allowed to grow at your own pace.</h3>
                <p>Small steps still move you forward. Give yourself the same kindness you'd give someone you love.</p>
              </div>
              <div className="daily-decoration">✳</div>
            </section>

            <section className="features-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">MADE FOR YOUR WELLBEING</div>
                  <h2>What do you need right now?</h2>
                </div>
              </div>
              <div className="feature-grid">
                {features.map(({ title, desc, icon: Icon, color, page }) => (
                  <button className="feature-card" key={title} onClick={() => setActivePage(page)}>
                    <span className="feature-icon" style={{ background: color }}><Icon size={23} strokeWidth={1.7} /></span>
                    <span className="feature-title">{title}</span>
                    <span className="feature-desc">{desc}</span>
                    <span className="feature-link">Explore <ArrowRight size={15} /></span>
                  </button>
                ))}
              </div>
            </section>

            <footer className="page-footer">
              <Heart size={14} /> Made with care, for the days that feel like a lot.
            </footer>
          </div>
        ) : activePage === "AI Companion" ? (
          <div className="page-container">
            <ChatPage />
          </div>
        ) : activePage === "Mood Tracker" ? (
          <div className="page-container">
            <MoodPage />
            </div>
        ) : activePage === "Calm Corner" ? (
          <div className="page-container">
            <CalmCorner />
          </div>
        ) : activePage === "Find Support" ? (
          <div className="page-container">
            <FindSupport />
          </div>
        ) : activePage === "My Reflections" ? (
          <div className="page-container">
            <ReflectionsPage />
          </div>
        ) : activePage === "Settings" ? (
          <div className="page-container">
            <SettingsPage />
          </div>
        ) : (
          <div className="page-container inner-page">
            <div className="eyebrow"><Sparkles size={15} /> YOUR PERSONAL SPACE</div>
            <h1>{activePage}</h1>
            <p className="welcome-copy">
              A gentle place to check in with yourself, one step at a time.
            </p>
            <div className="coming-card">
              <div className="coming-icon"><Heart size={28} /></div>
              <h2>This space is growing with you.</h2>
              <p>We're building this feature one step at a time.</p>
              <button className="primary-button" onClick={() => setActivePage("Dashboard")}>
                Back to your dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

