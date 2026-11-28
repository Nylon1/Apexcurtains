import { writeFileSync, mkdirSync } from "node:fs";
import {
  careDocument,
  carePrinciples,
  careHeadings,
  careFabrics,
  careProblems,
  careSources,
} from "../lib/curtain-care";
import { careGuide } from "../lib/atelier/care";

mkdirSync("docs/care-styling", { recursive: true });
writeFileSync(
  "docs/care-styling/content-for-handbook.json",
  JSON.stringify(
    {
      document: careDocument,
      principles: carePrinciples,
      headings: careHeadings,
      fabric: careFabrics,
      problems: careProblems,
      sources: careSources,
      careGuide,
    },
    null,
    2,
  ) + "\n",
);
