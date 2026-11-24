import { AgentConsole } from "../../components/new/AgentConsole";
import { Contact } from "../../components/new/Contact";
import { ControlRoom } from "../../components/new/ControlRoom";
import { Desk } from "../../components/new/Desk";
import { TopBar } from "../../components/new/TopBar";
import { WebMcpBridge } from "../../components/new/WebMcpBridge";
import { WorkIndex } from "../../components/new/WorkIndex";
import { profile } from "../../data/showcase";

export default function NewPortfolio() {
  return (
    <>
      <WebMcpBridge />
      <TopBar />
      <main id="top" className="mn-main">
        <section className="mn-intro" aria-labelledby="mn-name">
          <h1 id="mn-name">{profile.name}</h1>
          <p>{profile.lede}</p>
          <p className="mn-quiet">
            {profile.role} in {profile.location}
          </p>
        </section>

        <section id="work" className="mn-section mn-section--wide" aria-labelledby="work-h">
          <h2 id="work-h">Work</h2>
          <WorkIndex />
        </section>

        <section id="setup" className="mn-section mn-section--wide" aria-labelledby="setup-h">
          <h2 id="setup-h">Setup</h2>
          <ControlRoom />
        </section>

        <section id="fit" className="mn-section" aria-labelledby="fit-h">
          <h2 id="fit-h">Fit check</h2>
          <p>
            Paste a job ad or a project brief, or ask a yes-or-no question about me. Jev, a decision model from
            TypeSafe AI, reads it against my projects and answers with probabilities instead of prose.
          </p>
          <Desk />
        </section>

        <section id="agents" className="mn-section" aria-labelledby="agents-h">
          <h2 id="agents-h">For AI agents</h2>
          <AgentConsole />
        </section>

        <section id="contact" className="mn-section" aria-labelledby="contact-h">
          <h2 id="contact-h">Contact</h2>
          <p>{profile.about}</p>
          <p className="mn-quiet">
            {profile.education} {profile.languages}.
          </p>
          <Contact />
        </section>
      </main>
      <footer className="mn-foot">© 2026 {profile.name}</footer>
    </>
  );
}
