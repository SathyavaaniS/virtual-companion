
import { useEffect, useState } from "react";
import {
  Activity, Sun, Cloud, Moon, Coffee, CalendarDays,
  TrendingUp, Heart, Trash2, Sparkles
} from "lucide-react";

const moods = [
  { name: "Happy", score: 5, emoji: "☀️", color: "#F7DFA5", icon: Sun },
  { name: "Good", score: 4, emoji: "🌿", color: "#D7EEE1", icon: Heart },
  { name: "Okay", score: 3, emoji: "☁️", color: "#E5E2FA", icon: Cloud },
  { name: "Low", score: 2, emoji: "🌙", color: "#E8DDF8", icon: Moon },
  { name: "Stressed", score: 1, emoji: "☕", color: "#F7DDD5", icon: Coffee },
];

type MoodEntry = {
  id: string;
  mood: string;
  score: number;
  note: string;
  date: string;
};

const STORAGE_KEY = "virtual-companion-mood-history";

function readEntries(): MoodEntry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as MoodEntry[] : [];
  } catch {
    return [];
  }
}

function dayLabel(date: Date) {
  return date.toLocaleDateString("en", { weekday: "short" });
}

export default function MoodPage() {
  const [entries, setEntries] = useState<MoodEntry[]>(readEntries);
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function saveMood() {
    if (!selected) {
      setMessage("Choose a mood first, and we'll save your check-in.");
      return;
    }

    const mood = moods.find((item) => item.name === selected);
    if (!mood) return;

    const entry: MoodEntry = {
      id: `${Date.now()}-${Math.random()}`,
      mood: mood.name,
      score: mood.score,
      note: note.trim(),
      date: new Date().toISOString(),
    };

    setEntries((previous) => [entry, ...previous]);
    setSelected("");
    setNote("");
    setMessage("Your check-in has been saved. Thank you for taking a moment for yourself. 💜");
  }

  function deleteEntry(id: string) {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }

  const today = new Date().toDateString();
  const todayEntries = entries.filter(
    (entry) => new Date(entry.date).toDateString() === today
  );

  const weeklyData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const dayEntries = entries.filter(
      (entry) => new Date(entry.date).toDateString() === date.toDateString()
    );
    const average = dayEntries.length
      ? dayEntries.reduce((sum, entry) => sum + entry.score, 0) / dayEntries.length
      : 0;
    return { label: dayLabel(date), score: average, count: dayEntries.length };
  });

  const total = entries.length;
  const average = total
    ? (entries.reduce((sum, entry) => sum + entry.score, 0) / total).toFixed(1)
    : "—";

  return (
    <div className="mood-page">
      <header className="mood-page-heading">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> YOUR EMOTIONAL WELLNESS</div>
          <h1>Mood Tracker</h1>
          <p>Every feeling deserves a little space. Check in without judgement.</p>
        </div>
        <div className="mood-heading-icon"><Activity size={27} /></div>
      </header>

      <div className="mood-stats">
        <article className="mood-stat">
          <span className="stat-icon lilac"><CalendarDays size={19} /></span>
          <span className="stat-label">Today's check-ins</span>
          <strong>{todayEntries.length}</strong>
          <span className="stat-note">Your moments of reflection</span>
        </article>
        <article className="mood-stat">
          <span className="stat-icon green"><Heart size={19} /></span>
          <span className="stat-label">Total entries</span>
          <strong>{total}</strong>
          <span className="stat-note">One step at a time</span>
        </article>
        <article className="mood-stat">
          <span className="stat-icon peach"><TrendingUp size={19} /></span>
          <span className="stat-label">Average mood</span>
          <strong>{average}<small>{total ? " / 5" : ""}</small></strong>
          <span className="stat-note">Based on your saved entries</span>
        </article>
      </div>

      <section className="mood-checkin panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">PAUSE FOR A MOMENT</span>
            <h2>How are you feeling right now?</h2>
          </div>
          <span className="checkin-sparkle"><Sparkles size={20} /></span>
        </div>

        <div className="mood-choice-grid">
          {moods.map(({ name, emoji, color }) => (
            <button
              key={name}
              className={`mood-choice ${selected === name ? "chosen" : ""}`}
              onClick={() => { setSelected(name); setMessage(""); }}
              aria-pressed={selected === name}
            >
              <span className="mood-choice-emoji" style={{ background: color }}>{emoji}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>

        <label className="mood-note-label" htmlFor="mood-note">
          Anything you'd like to remember? <span>Optional</span>
        </label>
        <textarea
          id="mood-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="A thought, a moment, or just a few words..."
          rows={3}
          maxLength={500}
        />

        {message && <p className="mood-status" role="status">{message}</p>}

        <div className="save-mood-row">
          <span>Your entries stay in this browser on this device.</span>
          <button className="primary-button" onClick={saveMood}>Save check-in <Heart size={15} /></button>
        </div>
      </section>

      <section className="panel weekly-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">YOUR RECENT PATTERN</span>
            <h2>Your last 7 days</h2>
            <p>Only days with saved check-ins show a bar.</p>
          </div>
          <span className="chart-legend"><span /> Mood score</span>
        </div>

        <div className="weekly-chart" role="img" aria-label="Mood scores over the last seven days">
          {weeklyData.map((day, index) => (
            <div className="chart-day" key={`${day.label}-${index}`}>
              <div className="chart-track">
                {day.score > 0 && (
                  <div
                    className="chart-bar"
                    style={{ height: `${(day.score / 5) * 100}%` }}
                    title={`Average mood score ${day.score.toFixed(1)} out of 5`}
                  />
                )}
              </div>
              <span className="chart-day-label">{day.label}</span>
              <span className="chart-score">{day.count ? day.score.toFixed(1) : "—"}</span>
            </div>
          ))}
        </div>
        <p className="chart-note"><Heart size={14} /> A mood score is a reflection tool, not a diagnosis or a measure of your worth.</p>
      </section>

      <section className="panel history-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">YOUR PERSONAL JOURNAL</span>
            <h2>Recent check-ins</h2>
          </div>
          <span className="history-count">{total} {total === 1 ? "entry" : "entries"}</span>
        </div>

        {entries.length === 0 ? (
          <div className="empty-history">
            <span className="empty-history-icon"><Heart size={23} /></span>
            <h3>Your story starts here</h3>
            <p>Your saved mood check-ins will appear here. There's no pressure to track every day.</p>
          </div>
        ) : (
          <div className="history-list">
            {entries.slice(0, 20).map((entry) => {
              const mood = moods.find((item) => item.name === entry.mood);
              return (
                <article className="history-entry" key={entry.id}>
                  <span className="history-emoji" style={{ background: mood?.color ?? "#eee" }}>
                    {mood?.emoji ?? "💜"}
                  </span>
                  <div className="history-content">
                    <strong>{entry.mood}</strong>
                    <span>{new Date(entry.date).toLocaleString("en-IN", {
                      day: "numeric", month: "short", hour: "numeric", minute: "2-digit"
                    })}</span>
                    {entry.note && <p>{entry.note}</p>}
                  </div>
                  <button className="delete-entry" onClick={() => deleteEntry(entry.id)} aria-label="Delete mood entry" title="Delete entry">
                    <Trash2 size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="mood-privacy-note"><Heart size={13} /> Your feelings are personal. You can delete individual entries whenever you wish.</p>
    </div>
  );
}
