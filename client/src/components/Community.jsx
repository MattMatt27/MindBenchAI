import "../styles/Community.css";
import React from "react";
import { updates } from "../data/models";

const EMOJIS = ["🎉", "❤️", "👍"];

const normalizeTag = (t) => {
  const s = String(t || "").trim().toLowerCase();
  if (s === "new features" || s === "new-feature" || s === "new") return "New features";
  if (s === "bug fixes" || s === "bug-fixes" || s === "fixes" || s === "bug") return "Bug fixes";
  return "Updates";
};

const tagClass = (t) => {
  switch (t) {
    case "New features":
      return "is-new";
    case "Bug fixes":
      return "is-bug";
    default:
      return "is-update";
  }
};

const ts = (d) => {
  const clean = String(d)
    .replace(/(\d+)(st|nd|rd|th)/i, "$1")
    .replace(/\bSept\b/i, "Sep"); 
  return new Date(clean).getTime();
};

export default function Community() {
  const [activeTab, setActiveTab] = React.useState("What's New");
  const [activeTag, setActiveTag] = React.useState("All");

  const withTag = React.useMemo(
    () =>
      updates.map((u, i) => ({
        ...u,
        tag: normalizeTag(u.tag),
        _idx: i,
      })),
    []
  );

  // dynamic tag pills (generate from the datamodels)
  const TAGS = React.useMemo(() => {
    const unique = Array.from(new Set(withTag.map((u) => u.tag)));
    return ["All", ...unique];
  }, [withTag]);

  // filter by active tag
  const filtered = React.useMemo(
    () => withTag.filter((u) => activeTag === "All" || u.tag === activeTag),
    [withTag, activeTag]
  );

  // group by date and sort newest → oldest
  const grouped = React.useMemo(() => {
    const map = new Map();
    filtered.forEach((u) => {
      if (!map.has(u.date)) map.set(u.date, []);
      map.get(u.date).push(u);
    });
    return Array.from(map.entries())
      .map(([date, items]) => ({ date, items }))
      .sort((a, b) => ts(b.date) - ts(a.date));
  }, [filtered]);

  // reactions state (per original index)
  const [selected, setSelected] = React.useState(
    () => updates.map(() => EMOJIS.map(() => false))
  );

  const toggleReact = (origIdx, emojiIdx) => {
    setSelected((prev) =>
      prev.map((arr, i) =>
        i === origIdx ? arr.map((v, j) => (j === emojiIdx ? !v : v)) : arr
      )
    );
  };

  return (
    <div>
      <div className="cm-tabs">
        <button
          className={`cm-tab ${activeTab === "What's New" ? "active" : ""}`}
          onClick={() => setActiveTab("What's New")}
          type="button"
        >
          What’s new
        </button>
        <button
          className={`cm-tab ${activeTab === "Suggestions" ? "active" : ""}`}
          onClick={() => setActiveTab("Suggestions")}
          type="button"
        >
          Suggestions
        </button>
        <button
          className={`cm-tab ${activeTab === "Team members" ? "active" : ""}`}
          onClick={() => setActiveTab("Team members")}
          type="button"
        >
          Team members
        </button>
      </div>

      {activeTab === "What's New" && (
        <>
          <div className="cm-tagsbar">
            {TAGS.map((t) => (
              <button
                key={t}
                className={`cm-tag ${activeTag === t ? "active" : ""} ${
                  t === "All" ? "is-all" : tagClass(t)
                }`}
                onClick={() => setActiveTag(t)}
                type="button"
                aria-pressed={activeTag === t}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="cm-wrap">
            <ol className="cm-timeline">
              {grouped.map(({ date, items }, groupIdx) => (
                <li className="cm-item-group" key={date}>
                  <div className="cm-date">
                    <div className="cm-date-pill">{date}</div>
                  </div>
                  <div className="cm-track">
                    <span className="cm-dot" />
                  </div>
                  <div className="cm-group-items">
                    {items.map((u) => {
                      const badgeClass = tagClass(u.tag);
                      return (
                        <article className="cm-card" key={`${u.date}-${u._idx}`}>
                          <header className="cm-header">
                            <h3 className="cm-title">{u.title}</h3>
                            <span className={`cm-badge ${badgeClass}`}>{u.tag}</span>
                          </header>
                          {u.note && <p className="cm-note">{u.note}</p>}
                          {u.image && (
                            <div className="cm-media">
                              <img src={u.image} alt="" />
                            </div>
                          )}
                          <div className="cm-footer">
                            <div className="cm-reactions">
                              {EMOJIS.map((e, j) => {
                                const isOn = selected[u._idx][j];
                                return (
                                  <button
                                    key={j}
                                    className={`cm-react ${isOn ? "active" : ""}`}
                                    onClick={() => toggleReact(u._idx, j)}
                                    type="button"
                                    aria-pressed={isOn}
                                    title={e}
                                  >
                                    <span className="cm-emoji">{e}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
      {activeTab === "Suggestions" && <div className = "cm-suggestions" />}
      {activeTab === "Team members" && <div className="cm-team" />}
    </div>
  );
}
