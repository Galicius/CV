"use client";

import Link from "next/link";
import { profile } from "../../data/showcase";
import { store, useStore } from "./store";
import { mailto } from "./tools";

export function Contact() {
  const draft = useStore((s) => s.draft);
  const ready = draft.message.trim().length > 0;

  return (
    <div className="ct">
      <p className="ct-mail">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      <p className="ct-links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.cv} download>
          CV (PDF)
        </a>
        <Link href="/">Classic CV</Link>
      </p>

      <form className="ct-form" onSubmit={(e) => e.preventDefault()} aria-label="Write a message">
        <label>
          Name
          <input value={draft.name} autoComplete="name" onChange={(e) => store.setDraft({ name: e.target.value })} />
        </label>
        <label>
          Email
          <input
            type="email"
            value={draft.email}
            autoComplete="email"
            onChange={(e) => store.setDraft({ email: e.target.value })}
          />
        </label>
        <label className="ct-form__wide">
          Message
          <textarea rows={4} value={draft.message} onChange={(e) => store.setDraft({ message: e.target.value })} />
        </label>
        <p className="ct-form__wide">
          <a className="mn-btn" href={ready ? mailto(draft) : undefined} aria-disabled={!ready}>
            Open in your email app
          </a>
        </p>
      </form>
    </div>
  );
}
