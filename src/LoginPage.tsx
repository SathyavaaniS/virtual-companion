
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Heart, Mail, Lock, Sparkles } from "lucide-react";
import "./AuthPages.css";

type LoginPageProps = {
  onLoginSuccess: () => void;
  onBack: () => void;
};

export default function LoginPage({
  onLoginSuccess,
  onBack,
}: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (isSignup && name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    // Demo-only sign-in. Replace with real backend authentication later.
    try {
      const accountKey = "vc-demo-account";
      const savedAccount = localStorage.getItem(accountKey);

      if (isSignup) {
        if (savedAccount) {
          const account = JSON.parse(savedAccount);
          if (account.email === email.trim().toLowerCase()) {
            setError("An account with this email already exists. Please log in.");
            return;
          }
        }

        localStorage.setItem(
          accountKey,
          JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          })
        );
      } else {
        if (!savedAccount) {
          setError("No demo account found. Please create an account first.");
          return;
        }

        const account = JSON.parse(savedAccount);

        if (
          account.email !== email.trim().toLowerCase() ||
          account.password !== password
        ) {
          setError("Email or password is incorrect.");
          return;
        }
      }

      localStorage.setItem("vc-session", "active");
      localStorage.setItem(
        "vc-display-name",
        isSignup ? name.trim() : JSON.parse(savedAccount!).name
      );
      onLoginSuccess();
    } catch {
      setError("We couldn't complete that action. Please try again.");
    }
  }

  return (
    <div className="auth-page">
      <button className="auth-back" onClick={onBack}>
        <ArrowLeft size={18} /> Back to home
      </button>

      <div className="auth-layout">
        <section className="auth-welcome">
          <div className="public-brand">
            <span className="public-brand-icon"><Heart fill="white" /></span>
            <span>Virtual <b>Companion</b></span>
          </div>

          <span className="landing-badge">
            <Sparkles size={15} /> YOUR SPACE TO BREATHE
          </span>

          <h1>Come as you are.<br /><span>You're welcome here.</span></h1>
          <p>
            Some days are easy. Some aren't. Take a moment for yourself
            and continue your wellness journey at your own pace.
          </p>

          <div className="auth-quote">
            “You don't have to have it all figured out today.”
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-icon"><Heart size={24} /></div>

          <h2>{isSignup ? "Create your space" : "Welcome back"}</h2>
          <p className="auth-subtitle">
            {isSignup
              ? "Let's make a little room for you."
              : "Your personal wellness space is waiting."}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label className="auth-label">
                Your name
                <span className="auth-input-wrap">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </span>
              </label>
            )}

            <label className="auth-label">
              Email address
              <span className="auth-input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="auth-label">
              Password
              <span className="auth-input-wrap">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={6}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="auth-button auth-button-primary auth-submit" type="submit">
              {isSignup ? "Create account" : "Log in"} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to Virtual Companion?"}
            {" "}
            <button type="button" onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}>
              {isSignup ? "Log in" : "Create an account"}
            </button>
          </p>

          <p className="auth-privacy">
            Your wellbeing matters. Take things one step at a time. 💜
          </p>
        </section>
      </div>
    </div>
  );
}
