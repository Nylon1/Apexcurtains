import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { specialistEditions, specialistProject } from "../lib/specialist-editions";
import { portfolio } from "../lib/portfolio";

test("specialist media and project links resolve to the existing portfolio records", () => {
  assert.equal(Object.keys(specialistEditions).length, 7);
  for (const edition of Object.values(specialistEditions)) {
    assert.ok(fs.existsSync(`app${edition.path}/page.tsx`));
    for (const reference of [edition.hero, ...edition.projects]) {
      const project = specialistProject(reference.slug);
      assert.equal(project, portfolio.projects[reference.slug] || portfolio.archive[reference.slug]);
      assert.ok(project.media[reference.image || 0], reference.slug);
    }
    if (edition.film) assert.ok(specialistProject(edition.film).film, edition.film);
  }
  assert.throws(() => specialistProject("not-a-project"));
});

test("motor and access evidence retain their qualified scope", () => {
  const motor = specialistEditions.motors;
  assert.match(motor.heroNote, /window height/);
  assert.match(motor.heroNote, /not a certified curtain drop/);
  assert.ok(specialistProject(motor.hero.slug).film);
  assert.match(specialistEditions.workroom.heroNote, /not a workroom photograph/);
  assert.match(specialistEditions.install.principle.text, /not a universal access method/);
});

test("the specialist edition introduces no duplicated media paths, ratings or roller products", () => {
  const copy = JSON.stringify(specialistEditions);
  assert.doesNotMatch(copy, /roller blind|aggregateRating|\.webp|\.mp4|\/projects\//i);
  const source = fs.readFileSync("components/specialists/SpecialistServicePage.tsx", "utf8");
  assert.match(source, /\/reviews#customer-stories/);
  assert.doesNotMatch(source, /<blockquote/);
});
