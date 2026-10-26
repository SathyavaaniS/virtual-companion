
import { useEffect, useState } from "react";
import {
  BookHeart,
  Plus,
  Search,
  Trash2,
  CalendarDays,
  Heart,
  Sparkles,
} from "lucide-react";
import "../styles.css";

type Reflection = {
  id: string;
  date: string;
  mood: string;
  title: string;
  content: string;
};

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Stressed" },
];

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [selectedMood, setSelectedMood] = useState("Calm");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filterMood, setFilterMood] = useState("All moods");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("virtual-companion-reflections");
      if (saved) setReflections(JSON.parse(saved));
    } catch {
      setReflections([]);
    }
  }, []);

  function saveReflections(updated: Reflection[]) {
    setReflections(updated);
    localStorage.setItem(
      "virtual-companion-reflections",
      JSON.stringify(updated)
    );
  }

  function addReflection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) return;

    const newReflection: Reflection = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      mood: selectedMood,
      title: title.trim() || "A moment to remember",
      content: content.trim(),
    };

    saveReflections([newReflection, ...reflections]);
    setTitle("");
    setContent("");
    setSelectedMood("Calm");
    setShowEditor(false);
  }

  function deleteReflection(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reflection?"
    );
    if (confirmed) {
      saveReflections(reflections.filter((item) => item.id !== id));
    }
  }

  const filteredReflections = reflections.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());

    const matchesMood =
      filterMood === "All moods" || item.mood === filterMood;

    return matchesSearch && matchesMood;
  });

  return (
    <div className="reflection-page">
      <section className="reflection-heading">
        <span className="reflection-eyebrow">
          <Sparkles size={14} /> YOUR PRIVATE SPACE
        </span>
        <h1>My Reflections 💜</h1>
        <p>
          Your thoughts deserve a place to rest. Write freely, look back gently,
          and remember that growth takes time.
        </p>
      </section>

      <section className="reflection-hero">
        <div>
          <span className="reflection-pill">
            <BookHeart size={15} /> A little time for yourself
          </span>
          <h2>Every feeling has a story.</h2>
          <p>
            You don't need perfect words. Start wherever you are and let your
            thoughts flow without judgment.
          </p>
          <button
            className="reflection-primary"
            onClick={() => setShowEditor(!showEditor)}
          >
            <Plus size={17} /> Write a reflection
          </button>
        </div>
        <div className="reflection-illustration" aria-hidden="true">
          <BookHeart size={62} strokeWidth={1.3} />
          <Heart size={24} />
        </div>
      </section>

      {showEditor && (
        <section className="reflection-editor">
          <div className="reflection-editor-heading">
            <div>
              <h2>A page just for you</h2>
              <p>Be honest with yourself. There is no right or wrong answer.</p>
            </div>
            <button
              className="reflection-close"
              onClick={() => setShowEditor(false)}
              type="button"
              aria-label="Close editor"
            >
              ×
            </button>
          </div>

          <form onSubmit={addReflection}>
            <label htmlFor="reflection-title">Give this moment a title</label>
            <input
              id="reflection-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A thought, a memory, or a little win..."
              maxLength={100}
            />

            <span className="reflection-label">How are you feeling?</span>
            <div className="reflection-moods">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  type="button"
                  className={`reflection-mood ${
                    selectedMood === mood.label ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.label)}
                >
                  <span>{mood.emoji}</span>
                  {mood.label}
                </button>
              ))}
            </div>

            <label htmlFor="reflection-content">What's on your mind?</label>
            <textarea
              id="reflection-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Start writing here... What happened today? What are you feeling? What would you like to let go of?"
              rows={6}
              maxLength={5000}
              required
            />

            <div className="reflection-form-footer">
              <span>{content.length}/5000 characters</span>
              <button className="reflection-primary" type="submit">
                <BookHeart size={16} /> Save reflection
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="reflection-list-section">
        <div className="reflection-list-heading">
          <div>
            <h2>Your journal</h2>
            <p>
              {reflections.length === 1
                ? "One moment you've captured."
                : `${reflections.length} moments captured so far.`}
            </p>
          </div>
        </div>

        <div className="reflection-filters">
          <div className="reflection-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your reflections..."
              aria-label="Search reflections"
            />
          </div>

          <select
            value={filterMood}
            onChange={(event) => setFilterMood(event.target.value)}
            aria-label="Filter by mood"
          >
            <option>All moods</option>
            {moodOptions.map((mood) => (
              <option key={mood.label}>{mood.label}</option>
            ))}
          </select>
        </div>

        {filteredReflections.length === 0 ? (
          <div className="reflection-empty">
            <div className="reflection-empty-icon">
              <BookHeart size={30} />
            </div>
            <h3>
              {reflections.length === 0
                ? "Your first page starts here."
                : "No matching reflections found."}
            </h3>
            <p>
              {reflections.length === 0
                ? "Whenever you're ready, write about your day, a feeling, or something you're proud of."
                : "Try another search or mood filter."}
            </p>
            {reflections.length === 0 && (
              <button
                className="reflection-primary"
                onClick={() => setShowEditor(true)}
              >
                <Plus size={16} /> Write your first reflection
              </button>
            )}
          </div>
        ) : (
          <div className="reflection-cards">
            {filteredReflections.map((item) => {
              const mood = moodOptions.find(
                (option) => option.label === item.mood
              );

              return (
                <article className="reflection-card" key={item.id}>
                  <div className="reflection-card-top">
                    <span className="reflection-mood-tag">
                      {mood?.emoji || "💭"} {item.mood}
                    </span>
                    <button
                      className="reflection-delete"
                      onClick={() => deleteReflection(item.id)}
                      aria-label={`Delete ${item.title}`}
                      title="Delete reflection"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3>{item.title}</h3>
                  <p className="reflection-content">{item.content}</p>

                  <div className="reflection-date">
                    <CalendarDays size={14} />
                    {new Date(item.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="reflection-privacy">
        <Heart size={15} /> Your reflections are stored in this browser on this
        device. They are not synced or encrypted by this demo.
      </p>
    </div>
  );
}
