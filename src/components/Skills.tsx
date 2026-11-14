import { getTranslator, type Language } from "../context/LanguageContext";
import { databaseSkills, deploymentSkills, frameworkSkills, programmingSkills, toolSkills } from "../data/portfolio";
import { Section } from "./primitives";

export function Skills({ lang }: { lang: Language }) {
  const t = getTranslator(lang);
  const groups = [
    { label: t("skills.group1"), skills: programmingSkills },
    { label: t("skills.group2"), skills: frameworkSkills },
    { label: t("skills.group3"), skills: databaseSkills },
    { label: t("skills.group4"), skills: toolSkills },
    { label: t("skills.group5"), skills: deploymentSkills },
  ];

  return (
    <Section id="skills" number={4} title={t("skills.label")}>
      <dl className="skills">
        {groups.map((group) => (
          <div key={group.label} className="entry skills__row">
            <dt className="entry__meta skills__group">{group.label}</dt>
            <dd className="entry__body">
              <ul className="run-in" role="list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
