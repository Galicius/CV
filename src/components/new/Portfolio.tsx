import { Separator } from "@ui-sdk/react/separator";
import { AgentConsole } from "./AgentConsole";
import { Contact } from "./Contact";
import { ControlRoom } from "./ControlRoom";
import { Desk } from "./Desk";
import { TopBar } from "./TopBar";
import { WebMcpBridge } from "./WebMcpBridge";
import { WorkIndex } from "./WorkIndex";
import { profile } from "../../data/showcase";

/** A ruled-off section. The rule is only visual; the heading already tells sections apart. */
function Section({ id, title, wide = false, children }: { id: string; title: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <>
      <Separator decorative className="mn-rule" />
      <section id={id} className={wide ? "mn-section mn-section--wide" : "mn-section"} aria-labelledby={`${id}-h`}>
        <h2 id={`${id}-h`}>{title}</h2>
        {children}
      </section>
    </>
  );
}

/** The /new page. `particles` swaps the floating screenshot for the particle stage (shown at /new/1). */
export function Portfolio({ particles = false }: { particles?: boolean }) {
  return (
    <>
      <WebMcpBridge />
      <TopBar />
      <main id="top" className="mn-main">
        <section className="mn-intro" aria-labelledby="mn-name">
          <h1 id="mn-name">{profile.name}</h1>
          <p>{profile.lede}</p>
          <p className="mn-quiet">
            {profile.job.title} at {profile.job.company} · {profile.location}
          </p>
        </section>

        <Section id="now" title="Now">
          <p>
            <strong>
              {profile.job.title} at {profile.job.company}
            </strong>
            , since {profile.job.since}. {profile.job.summary}
          </p>
        </Section>

        <Section id="work" title="Work" wide>
          <WorkIndex particles={particles} />
        </Section>

        <Section id="setup" title="Setup" wide>
          <ControlRoom />
        </Section>

        <Section id="fit" title="Fit check">
          <p>
            Paste a job ad or a project brief, or ask a yes-or-no question about me. Jev, a decision model from
            TypeSafe AI, reads it against my projects and answers with probabilities instead of prose.
          </p>
          <Desk />
        </Section>

        <Section id="agents" title="For AI agents">
          <AgentConsole />
        </Section>

        <Section id="contact" title="Contact">
          <p>{profile.about}</p>
          <p className="mn-quiet">
            {profile.education} {profile.languages}.
          </p>
          <Contact />
        </Section>
      </main>
      <footer className="mn-foot">© 2026 {profile.name}</footer>
    </>
  );
}
