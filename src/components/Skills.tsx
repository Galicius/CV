import type { Translator } from "../context/LanguageContext";
import { databaseSkills, deploymentSkills, frameworkSkills, programmingSkills, toolSkills } from "../data/portfolio";
import { SectionHead, pad } from "./ui";

/** A typographic matrix: group label column + items on a shared column grid. */
export function Skills({ t }: { t: Translator }) {
  const groups = [
    { label: t("skills.group1"), skills: programmingSkills },
    { label: t("skills.group2"), skills: frameworkSkills },
    { label: t("skills.group3"), skills: databaseSkills },
    { label: t("skills.group4"), skills: toolSkills },
    { label: t("skills.group5"), skills: deploymentSkills },
  ];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills" title={t("skills.label")} />

        <dl>
          {groups.map((group) => (
            <div key={group.label} className="matrix-row grid-12">
              <dt className="label col-span-full lg:col-span-3">
                <span>{group.label}</span>
                <span className="count">{pad(group.skills.length)}</span>
              </dt>
              <dd className="col-span-full lg:col-span-9">
                <ul className="matrix-items">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
