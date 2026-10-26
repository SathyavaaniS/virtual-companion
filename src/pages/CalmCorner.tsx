
import { useState } from "react";
import {
  Wind,
  Heart,
  Flower2,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
} from "lucide-react";
import "../styles.css";

type Activity = "breathing" | "grounding" | "gratitude";

export default function CalmCorner() {
  const [activity, setActivity] = useState<Activity>("breathing");
  const [isBreathing, setIsBreathing] = useState(false);
  const [step, setStep] = useState(0);
  const [gratitude, setGratitude] = useState(["", "", ""]);
  const [saved, setSaved] = useState(false);

  const groundingSteps = [
    { title: "5 things you can see", description: "Look around and notice five things near you." },
    { title: "4 things you can feel", description: "Notice four things your body can physically feel." },
    { title: "3 things you can hear", description: "Listen carefully for three sounds around you." },
    { title: "2 things you can smell", description: "Notice two scents, or two scents you enjoy." },
    { title: "1 thing you can taste", description: "Notice one taste or take a mindful sip of water." },
  ];

  const activities = [
    {
      id: "breathing" as const,
      icon: Wind,
      title: "Mindful Breathing",
      description: "Slow down and reconnect with your breath.",
      time: "2 minutes",
      color: "lavender",
    },
    {
      id: "grounding" as const,
      icon: Flower2,
      title: "5-4-3-2-1 Grounding",
      description: "Bring your attention back to the present.",
      time: "3 minutes",
      color: "mint",
    },
    {
      id: "gratitude" as const,
      icon: Heart,
      title: "Gratitude Journal",
      description: "Notice the little things that matter to you.",
      time: "2 minutes",
      color: "peach",
    },
  ];

  function changeActivity(next: Activity) {
    setActivity(next);
    setIsBreathing(false);
    setStep(0);
    setSaved(false);
  }

  function saveGratitude() {
    const entries = gratitude.map((item) => item.trim()).filter(Boolean);
    if (!entries.length) return;

    const previous = JSON.parse(
      localStorage.getItem("virtual-companion-gratitude") || "[]"
    );

    localStorage.setItem(
      "virtual-companion-gratitude",
      JSON.stringify([
        ...previous,
        { date: new Date().toISOString(), entries },
      ])
    );

    setSaved(true);
  }

  return (
    <div className="calm-page">
      <section className="calm-heading">
        <span className="calm-eyebrow">
          <Sparkles size={14} /> YOUR PERSONAL RESET SPACE
        </span>
        <h1>Welcome to Calm Corner 💜</h1>
        <p>
          Take a little pause for yourself. There is no rush, no pressure, and
          nothing you need to prove here.
        </p>
      </section>

      <section className="calm-hero">
        <div className="calm-hero-copy">
          <span className="calm-pill">
            <Heart size={14} /> A moment just for you
          </span>
          <h2>It's okay to slow down.</h2>
          <p>
            You don't have to figure everything out right now. Start with one
            small, gentle step.
          </p>
          <button
            className="calm-primary"
            onClick={() => changeActivity("breathing")}
          >
            <Wind size={17} /> Take a deep breath
          </button>
        </div>

        <div className="calm-orbit" aria-hidden="true">
          <div className="calm-orbit-middle">
            <div className="calm-orbit-inner">
              <Flower2 size={42} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="calm-section-heading">
          <div>
            <h2>What do you need right now?</h2>
            <p>Choose whatever feels right for you.</p>
          </div>
        </div>

        <div className="calm-activity-grid">
          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`calm-activity-card ${
                  activity === item.id ? "selected" : ""
                }`}
                onClick={() => changeActivity(item.id)}
              >
                <span className={`calm-icon ${item.color}`}>
                  <Icon size={22} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <small>{item.time} →</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="calm-workspace">
        {activity === "breathing" && (
          <div className="calm-panel">
            <span className="calm-eyebrow">01 / BREATHE</span>
            <h2>Let's breathe together.</h2>
            <p>
              Follow the circle at a comfortable pace. Breathe naturally and
              stop if you feel dizzy or uncomfortable.
            </p>

            <div
              className={`breathing-circle ${
                isBreathing ? "breathing-active" : ""
              }`}
            >
              <div className="breathing-circle-inner">
                <Wind size={28} />
                <strong>{isBreathing ? "Breathe slowly" : "Ready when you are"}</strong>
                <span>{isBreathing ? "Inhale and exhale gently" : "At your own pace"}</span>
              </div>
            </div>

            <button
              className="calm-primary"
              onClick={() => setIsBreathing(!isBreathing)}
            >
              {isBreathing ? <Pause size={17} /> : <Play size={17} />}
              {isBreathing ? "Pause exercise" : "Start breathing"}
            </button>

            <p className="calm-note">
              You are allowed to take things one moment at a time.
            </p>
          </div>
        )}

        {activity === "grounding" && (
          <div className="calm-panel">
            <span className="calm-eyebrow">02 / GROUND YOURSELF</span>
            <h2>Come back to the present.</h2>
            <p>
              Gently notice your surroundings, one sense at a time. There is no
              need to get every step perfect.
            </p>

            <div className="grounding-progress">
              {groundingSteps.map((item, index) => (
                <div
                  key={item.title}
                  className={`grounding-step ${
                    index === step ? "current" : ""
                  } ${index < step ? "completed" : ""}`}
                >
                  <span>
                    {index < step ? <CheckCircle2 size={20} /> : index + 1}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="calm-button-row">
              <button
                className="calm-secondary"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Previous
              </button>

              <button
                className="calm-primary"
                onClick={() =>
                  setStep(step < groundingSteps.length - 1 ? step + 1 : 0)
                }
              >
                {step === groundingSteps.length - 1
                  ? "Start again"
                  : "Next step"}
              </button>
            </div>

            <p className="calm-note">
              {step === groundingSteps.length - 1
                ? "You've reached the final step. Well done for taking this pause."
                : `Step ${step + 1} of ${groundingSteps.length}`}
            </p>
          </div>
        )}

        {activity === "gratitude" && (
          <div className="calm-panel">
            <span className="calm-eyebrow">03 / GRATITUDE</span>
            <h2>Find three little good things.</h2>
            <p>
              They don't have to be big or important to anyone else. This is
              your space to reflect without judgment.
            </p>

            {gratitude.map((entry, index) => (
              <div className="gratitude-field" key={index}>
                <label htmlFor={`gratitude-${index}`}>
                  {index + 1}. {[
                    "Something that made you smile",
                    "Something you appreciate today",
                    "Something kind you did for yourself",
                  ][index]}
                </label>
                <input
                  id={`gratitude-${index}`}
                  value={entry}
                  onChange={(event) => {
                    const next = [...gratitude];
                    next[index] = event.target.value;
                    setGratitude(next);
                    setSaved(false);
                  }}
                  placeholder="Write a little thought..."
                  maxLength={250}
                />
              </div>
            ))}

            <div className="calm-button-row">
              <span className="calm-counter">
                {gratitude.filter((item) => item.trim()).length} of 3 filled
              </span>

              <button className="calm-primary" onClick={saveGratitude}>
                <Heart size={16} /> Save reflection
              </button>
            </div>

            {saved && (
              <div className="calm-feedback" role="status">
                Your reflection has been saved on this device. 💜
              </div>
            )}

            <p className="calm-note">
              You can appreciate today without pretending it was perfect.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
