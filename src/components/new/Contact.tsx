"use client";

import { Button } from "@ui-sdk/react/button";
import { Field, FieldError, FieldLabel } from "@ui-sdk/react/field";
import { Input } from "@ui-sdk/react/input";
import { Textarea } from "@ui-sdk/react/textarea";
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

      {/* Nothing is sent from here: a valid draft opens in the visitor's email app. */}
      <form
        className="ct-form"
        aria-label="Write a message"
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) window.location.href = mailto(draft);
        }}
      >
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value={draft.name} autoComplete="name" onValueChange={(name) => store.setDraft({ name })} />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            value={draft.email}
            autoComplete="email"
            onValueChange={(email) => store.setDraft({ email })}
          />
          <FieldError />
        </Field>
        <Field className="ct-form__wide">
          <FieldLabel>Message</FieldLabel>
          <Textarea rows={4} required value={draft.message} onValueChange={(message) => store.setDraft({ message })} />
          <FieldError />
        </Field>
        <p className="ct-form__wide">
          <Button className="mn-btn" type="submit" disabled={!ready} focusableWhenDisabled>
            Open in email app
          </Button>
        </p>
      </form>
    </div>
  );
}
