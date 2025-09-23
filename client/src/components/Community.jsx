import "../styles/Community.css";
import React from "react";
import { updates, suggestions } from "../data/models";

const EMOJIS = ["🎉", "❤️", "👍"];

const normalizeTag = (t) => {
  const s = String(t || "").trim().toLowerCase();
  if (s === "new features" || s === "new-feature" || s === "new") return "New features";
  if (s === "bug fixes" || s === "bug-fixes" || s === "fixes" || s === "bug") return "Bug fixes";
  return "Updates";
};

const tagClass = (t) =>
  t === "New features" ? "is-new" : t === "Bug fixes" ? "is-bug" : "is-update";

const ts = (d) =>
  new Date(String(d).replace(/(\d+)(st|nd|rd|th)/i, "$1").replace(/\bSept\b/i, "Sep")).getTime();

const statusLabel = (s) => {
  const v = String(s || "").toLowerCase();
  if (v === "in-progress" || v === "in progress") return "In Progress";
  if (v === "planned") return "Planned";
  if (v === "open vote" || v === "open-vote" || v === "open") return "Open vote";
  return s || "";
};

const statusClass = (s) => {
  const v = String(s || "").toLowerCase();
  if (v === "in-progress" || v === "in progress") return "is-progress";
  if (v === "planned") return "is-planned";
  if (v === "open vote" || v === "open-vote" || v === "open") return "is-open";
  return "is-open";
};

export default function Community() {
  const [activeTab, setActiveTab] = React.useState("What's New");

  const withTag = React.useMemo(
    () => updates.map((u, i) => ({ ...u, tag: normalizeTag(u.tag), _idx: i })),
    []
  );

  const TAGS = React.useMemo(
    () => ["All", ...Array.from(new Set(withTag.map((u) => u.tag)))],
    [withTag]
  );

  const [activeTag, setActiveTag] = React.useState("All");

  const filtered = React.useMemo(
    () => withTag.filter((u) => activeTag === "All" || u.tag === activeTag),
    [withTag, activeTag]
  );

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

  const [selected, setSelected] = React.useState(
    () => withTag.map(() => EMOJIS.map(() => false))
  );

  const toggleReact = (origIdx, emojiIdx) => {
    setSelected((prev) =>
      prev.map((arr, i) =>
        i === origIdx ? arr.map((v, j) => (j === emojiIdx ? !v : v)) : arr
      )
    );
  };

  const sList = React.useMemo(() => suggestions.map((s, i) => ({ ...s, _idx: i })), []);
  const [votes, setVotes] = React.useState(() => sList.map((s) => s.vote ?? 0));
  const [upvoted, setUpvoted] = React.useState(() => sList.map(() => false));

  const toggleUpvote = (i) => {
    const wasOn = upvoted[i];
    setUpvoted((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    setVotes((prev) => prev.map((v, idx) => (idx === i ? v + (wasOn ? -1 : 1) : v)));
  };

  const sortedSuggestions = React.useMemo(() => {
    return [...sList].sort((a, b) => {
      const dv = (votes[b._idx] ?? 0) - (votes[a._idx] ?? 0);
      return dv !== 0 ? dv : a.title.localeCompare(b.title);
    });
  }, [sList, votes]);

  return (
    <div>
      <div className="cm-tabs">
        {["What's New", "Suggestions", "Team members"].map((tab) => (
          <button
            key={tab}
            className={`cm-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            type="button"
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
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
              {grouped.map(({ date, items }) => (
                <li className="cm-item-group" key={date}>
                  <div className="cm-date">
                    <div className="cm-date-pill">{date}</div>
                  </div>
                  <div className="cm-track">
                    <span className="cm-dot" />
                  </div>
                  <div className="cm-group-items">
                    {items.map((u) => (
                      <article className="cm-card" key={`${u.date}-${u._idx}`}>
                        <header className="cm-header">
                          <h3 className="cm-title">{u.title}</h3>
                          <span className={`cm-badge ${tagClass(u.tag)}`}>{u.tag}</span>
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
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      {activeTab === "Suggestions" && (
        <div className="cm-wrap">
          <ol className="sg-list">
            {sortedSuggestions.map((s) => {
              const i = s._idx;
              const isOn = upvoted[i];
              return (
                <li className="sg-item" key={i}>
                  <button
                    className={`sg-vote ${isOn ? "active" : ""}`}
                    onClick={() => toggleUpvote(i)}
                    type="button"
                    aria-pressed={isOn}
                    title={isOn ? "Remove upvote" : "Upvote"}
                  >
                    <span className="sg-caret">▲</span>
                    <span className="sg-count">{votes[i] ?? 0}</span>
                  </button>

                  <article className="sg-card">
                    <h4 className="sg-title">{s.title}</h4>
                    {s.desc && <p className="sg-desc">{s.desc}</p>}
                    <div className="sg-tags">
                      <span className={`sg-badge ${statusClass(s.status)}`}>
                        {statusLabel(s.status)}
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {activeTab === "Team members" && <div className="cm-team" />}
    </div>
  );
}
