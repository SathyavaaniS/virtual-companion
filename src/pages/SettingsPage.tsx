
import { useState } from "react";
import {
  Settings,
  UserRound,
  Bell,
  Palette,
  ShieldCheck,
  Save,
  RotateCcw,
  Check,
} from "lucide-react";
import "../styles.css";

type Preferences = {
  displayName: string;
  email: string;
  dailyReminder: boolean;
  moodReminder: boolean;
  weeklySummary: boolean;
  theme: string;
  fontSize: string;
};

const defaultPreferences: Preferences = {
  displayName: "",
  email: "",
  dailyReminder: true,
  moodReminder: true,
  weeklySummary: false,
  theme: "Lavender",
  fontSize: "Medium",
};

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const saved = localStorage.getItem("virtual-companion-settings");
      return saved
        ? { ...defaultPreferences, ...JSON.parse(saved) }
        : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  const [savedMessage, setSavedMessage] = useState(false);

  function updatePreference<K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) {
    setPreferences((previous) => ({ ...previous, [key]: value }));
    setSavedMessage(false);
  }

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(
      "virtual-companion-settings",
      JSON.stringify(preferences)
    );
    setSavedMessage(true);
  }

  function resetSettings() {
    setPreferences(defaultPreferences);
    localStorage.setItem(
      "virtual-companion-settings",
      JSON.stringify(defaultPreferences)
    );
    setSavedMessage(false);
  }

  return (
    <div className="settings-page">
      <section className="settings-heading">
        <span className="settings-eyebrow">
          <Settings size={15} /> MAKE IT YOURS
        </span>
        <h1>Settings</h1>
        <p>
          Personalize your Virtual Companion experience so it feels comfortable
          and right for you.
        </p>
      </section>

      <form onSubmit={saveSettings}>
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon lavender">
              <UserRound size={21} />
            </div>
            <div>
              <h2>Personal information</h2>
              <p>Choose how you would like to be identified.</p>
            </div>
          </div>

          <div className="settings-fields">
            <div className="settings-field">
              <label htmlFor="settings-name">Display name</label>
              <input
                id="settings-name"
                value={preferences.displayName}
                onChange={(event) =>
                  updatePreference("displayName", event.target.value)
                }
                placeholder="What should we call you?"
                maxLength={60}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="settings-email">Email address (optional)</label>
              <input
                id="settings-email"
                type="email"
                value={preferences.email}
                onChange={(event) =>
                  updatePreference("email", event.target.value)
                }
                placeholder="you@example.com"
              />
            </div>
          </div>
          <p className="settings-help">
            This demo stores these details in your browser only. It does not
            create an account or send emails.
          </p>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon peach">
              <Bell size={21} />
            </div>
            <div>
              <h2>Reminders and summaries</h2>
              <p>Choose the reminders you would like to enable.</p>
            </div>
          </div>

          <div className="settings-toggle-list">
            <label className="settings-toggle-row">
              <span>
                <strong>Daily wellbeing reminder</strong>
                <small>A gentle prompt to check in with yourself.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.dailyReminder}
                onChange={(event) =>
                  updatePreference("dailyReminder", event.target.checked)
                }
              />
            </label>

            <label className="settings-toggle-row">
              <span>
                <strong>Mood check-in reminder</strong>
                <small>Remember to record how you're feeling.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.moodReminder}
                onChange={(event) =>
                  updatePreference("moodReminder", event.target.checked)
                }
              />
            </label>

            <label className="settings-toggle-row">
              <span>
                <strong>Weekly reflection summary</strong>
                <small>Keep a weekly reflection habit.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.weeklySummary}
                onChange={(event) =>
                  updatePreference("weeklySummary", event.target.checked)
                }
              />
            </label>
          </div>

          <p className="settings-help">
            These options save your preferences only. Automatic notifications
            and weekly summaries are not implemented in this demo.
          </p>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon mint">
              <Palette size={21} />
            </div>
            <div>
              <h2>Appearance</h2>
              <p>Choose your preferred visual settings.</p>
            </div>
          </div>

          <div className="settings-fields">
            <div className="settings-field">
              <label htmlFor="settings-theme">Color theme</label>
              <select
                id="settings-theme"
                value={preferences.theme}
                onChange={(event) =>
                  updatePreference("theme", event.target.value)
                }
              >
                <option>Lavender</option>
                <option>Ocean</option>
                <option>Sage</option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="settings-font">Text size preference</label>
              <select
                id="settings-font"
                value={preferences.fontSize}
                onChange={(event) =>
                  updatePreference("fontSize", event.target.value)
                }
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>

          <p className="settings-help">
            Theme and text-size choices are saved, but do not yet change the
            appearance of the entire app.
          </p>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon lavender">
              <ShieldCheck size={21} />
            </div>
            <div>
              <h2>Privacy and data</h2>
              <p>Understand how this prototype stores information.</p>
            </div>
          </div>

          <div className="settings-privacy-note">
            <ShieldCheck size={20} />
            <p>
              Your settings, reflections, and gratitude entries are stored
              locally in this browser. This prototype has no account
              authentication, cloud sync, or dedicated data encryption.
              Avoid entering sensitive personal information.
            </p>
          </div>
        </section>

        <div className="settings-actions">
          <button
            className="settings-reset-button"
            type="button"
            onClick={resetSettings}
          >
            <RotateCcw size={16} /> Reset settings
          </button>

          <button className="settings-save-button" type="submit">
            <Save size={16} /> Save changes
          </button>
        </div>

        {savedMessage && (
          <p className="settings-success" role="status">
            <Check size={17} /> Your settings have been saved!
          </p>
        )}
      </form>
    </div>
  );
}
