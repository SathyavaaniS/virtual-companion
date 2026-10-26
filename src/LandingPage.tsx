
import { ArrowRight, Heart, MessageCircle, Activity, Wind, Sparkles, ShieldCheck } from "lucide-react";
import "./AuthPages.css";

type LandingPageProps = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export default function LandingPage({
  onGetStarted,
  onLogin,
}: LandingPageProps) {
  return (
    <div className="public-page">
      <nav className="public-nav">
        <a className="public-brand" href="#home">
          <span className="public-brand-icon"><Heart fill="white" /></span>
          <span>Virtual <b>Companion</b></span>
        </a>

        <div className="public-nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <button className="auth-button auth-button-light" onClick={onLogin}>
            Log in
          </button>
          <button className="auth-button auth-button-primary" onClick={onGetStarted}>
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main id="home">
        <section className="landing-hero">
          <div className="landing-copy">
            <span className="landing-badge">
              <Sparkles size={15} /> YOUR PERSONAL WELLNESS SPACE
            </span>

            <h1>A little more care.<br />
              A little less <span>alone.</span>
            </h1>

            <p>
              Life can feel overwhelming sometimes. Take a breath, express
              what is on your mind, and discover small ways to care for yourself
              with Virtual Companion.
            </p>

            <div className="landing-actions">
              <button className="auth-button auth-button-primary auth-button-large" onClick={onGetStarted}>
                Begin your journey <ArrowRight size={18} />
              </button>
              <button className="auth-button auth-button-light auth-button-large" onClick={onLogin}>
                I already have an account
              </button>
            </div>

            <div className="landing-trust">
              <ShieldCheck size={18} />
              <span>Your space, your pace. No pressure to be perfect.</span>
            </div>
          </div>

          <div className="landing-art">
            <div className="landing-orbit orbit-one" />
            <div className="landing-orbit orbit-two" />
            <div className="landing-sun" />
            <div className="landing-cloud">☁</div>
            <div className="landing-hill hill-back" />
            <div className="landing-hill hill-front" />
            <div className="landing-flower flower-one">✿</div>
            <div className="landing-flower flower-two">✳</div>
            <div className="landing-note">
              <Heart size={20} fill="currentColor" />
              <div>
                <strong>A gentle reminder</strong>
                <span>You deserve kindness, too.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-about" id="about">
          <span className="landing-eyebrow">A SPACE THAT LISTENS</span>
          <h2>You don't have to figure it all out today.</h2>
          <p>
            Virtual Companion brings emotional check-ins, calming activities,
            journaling, and everyday organization into one welcoming space.
          </p>
        </section>

        <section className="landing-features" id="features">
          <article className="landing-feature">
            <span className="landing-feature-icon feature-lilac"><MessageCircle /></span>
            <h3>Talk it out</h3>
            <p>Express your thoughts and feelings in a supportive space.</p>
          </article>

          <article className="landing-feature">
            <span className="landing-feature-icon feature-green"><Activity /></span>
            <h3>Understand your mood</h3>
            <p>Check in with yourself and notice your emotional patterns.</p>
          </article>

          <article className="landing-feature">
            <span className="landing-feature-icon feature-peach"><Wind /></span>
            <h3>Find your calm</h3>
            <p>Explore breathing exercises and grounding activities.</p>
          </article>
        </section>

        <section className="landing-cta">
          <h2>Make a little space for yourself.</h2>
          <p>Your journey can start with one small step.</p>
          <button className="auth-button auth-button-primary auth-button-large" onClick={onGetStarted}>
            Get started for free <ArrowRight size={18} />
          </button>
        </section>
      </main>

      <footer className="public-footer">
        <Heart size={15} /> Virtual Companion · Made with care.
        <p>This app offers wellness support, not professional medical care.</p>
      </footer>
    </div>
  );
}
