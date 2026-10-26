
import { useState } from "react";
import {
  HeartHandshake,
  Search,
  MapPin,
  Phone,
  Globe,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import "../styles.css";

const supportOptions = [
  {
    title: "Talk to a Counsellor",
    category: "Professional support",
    description:
      "Explore professional counselling for emotional challenges, stress, or difficult life situations.",
    icon: HeartHandshake,
    color: "lavender",
  },
  {
    title: "Connect with Someone",
    category: "Personal support",
    description:
      "Consider reaching out to a trusted friend, family member, teacher, or mentor.",
    icon: MessageCircle,
    color: "mint",
  },
  {
    title: "Find a Helpline",
    category: "Immediate support",
    description:
      "Find verified support services when you need someone to listen or help you stay safe.",
    icon: Phone,
    color: "peach",
  },
];

export default function FindSupport() {
  const [location, setLocation] = useState("");
  const [supportType, setSupportType] = useState("All support");
  const [showResults, setShowResults] = useState(false);

  function searchSupport() {
    setShowResults(true);
  }

  function openSearch() {
    const query = encodeURIComponent(
      `${supportType === "All support" ? "mental health support counsellors" : supportType} near ${location || "me"}`
    );
    window.open(
      `https://www.google.com/search?q=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="support-page">
      <section className="support-heading">
        <span className="support-eyebrow">
          <HeartHandshake size={15} /> YOU DON'T HAVE TO DO IT ALONE
        </span>
        <h1>Find Support 💜</h1>
        <p>
          Asking for support is a strength. Explore your options at your own
          pace, and choose what feels comfortable for you.
        </p>
      </section>

      <section className="support-hero">
        <div className="support-hero-content">
          <span className="support-pill">
            <ShieldCheck size={15} /> Your wellbeing matters
          </span>
          <h2>It's okay to ask for a little help.</h2>
          <p>
            Whether you need someone to listen, professional guidance, or
            urgent assistance, there are people and services that can help.
          </p>
        </div>
        <div className="support-hero-art">
          <HeartHandshake size={76} strokeWidth={1.3} />
          <span>Support, at your pace.</span>
        </div>
      </section>

      <section className="support-options-section">
        <h2>Explore your support options</h2>
        <p className="support-muted">
          Start with whichever option feels right for you.
        </p>

        <div className="support-options-grid">
          {supportOptions.map((item) => {
            const Icon = item.icon;

            return (
              <article className="support-option-card" key={item.title}>
                <div className={`support-icon ${item.color}`}>
                  <Icon size={23} />
                </div>
                <span className="support-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button
                  className="support-text-button"
                  onClick={() => {
                    setSupportType(
                      item.title === "Talk to a Counsellor"
                        ? "counsellors"
                        : item.title === "Find a Helpline"
                          ? "mental health helplines"
                          : "emotional support services"
                    );
                    setShowResults(true);
                  }}
                >
                  Explore options <ExternalLink size={15} />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="support-search-panel">
        <div className="support-search-title">
          <div className="support-icon lavender">
            <MapPin size={22} />
          </div>
          <div>
            <h2>Explore support near you</h2>
            <p className="support-muted">
              Enter a city or area to search for relevant services.
            </p>
          </div>
        </div>

        <form
          className="support-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            searchSupport();
          }}
        >
          <label htmlFor="support-location">City or area</label>
          <div className="support-input-wrap">
            <MapPin size={18} />
            <input
              id="support-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Chennai"
            />
          </div>

          <label htmlFor="support-type">What kind of support?</label>
          <select
            id="support-type"
            value={supportType}
            onChange={(event) => setSupportType(event.target.value)}
          >
            <option>All support</option>
            <option>counsellors</option>
            <option>mental health helplines</option>
            <option>emotional support services</option>
            <option>psychologists</option>
          </select>

          <button className="support-primary-button" type="submit">
            <Search size={17} /> Find support
          </button>
        </form>

        {showResults && (
          <div className="support-results" role="status">
            <Globe size={20} />
            <div>
              <strong>Let's explore available services.</strong>
              <p>
                Virtual Companion does not verify provider availability or
                credentials. Review service details before contacting anyone.
              </p>
              <button
                className="support-text-button"
                onClick={openSearch}
                type="button"
              >
                Search available services <ExternalLink size={15} />
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="support-reminder">
        <HeartHandshake size={23} />
        <div>
          <h3>A gentle reminder</h3>
          <p>
            Virtual Companion offers supportive information, not professional
            diagnosis or treatment. If you feel unsafe or may hurt yourself,
            contact local emergency services or a trusted person immediately.
          </p>
        </div>
      </section>
    </div>
  );
}
