import { CvDocument } from "../../../../components/CvDocument";
import { LanguageRoot } from "../../../../components/LanguageRoot";
import { LANGUAGE_SWITCH_ENABLED } from "../../../../context/LanguageContext";

export default function ClassicCv() {
  if (!LANGUAGE_SWITCH_ENABLED) return <CvDocument lang="en" />;

  // Both editions are rendered on the server; the client only picks one.
  return <LanguageRoot en={<CvDocument lang="en" />} sl={<CvDocument lang="sl" />} />;
}
