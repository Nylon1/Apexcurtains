import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import sharp from "sharp";
import { portfolio, mergePortfolioProjects, newPortfolioProjects } from "../lib/portfolio";

test("every published story has real media with the correct intrinsic dimensions and valid service routes", async () => {
  for (const [slug, story] of Object.entries({ ...portfolio.projects, ...portfolio.archive })) {
    assert.ok(story.technical.text && story.interior.text, slug);
    assert.ok(story.media.length, slug);
    for (const image of story.media) {
      assert.ok(image.alt && image.caption, slug);
      const metadata = await sharp(`public${image.src}`).metadata();
      assert.equal(image.width, metadata.width, image.src);
      assert.equal(image.height, metadata.height, image.src);
    }
    if (story.film) {
      assert.ok(existsSync(`public${story.film.src}`), slug);
      assert.ok(existsSync(`public${story.film.poster}`), slug);
    }
    for (const service of story.services) {
      assert.ok(existsSync(`app${service.href}/page.tsx`), service.href);
    }
  }
});

test("combining source records preserves their identity and does not duplicate curated slugs", () => {
  const curated = newPortfolioProjects.find((project) => project.slug === "jesmond")!;
  const record = { ...curated, id: 1234, title: "Source title" };
  const merged = mergePortfolioProjects([record]);
  assert.equal(merged.filter((project) => project.slug === "jesmond").length, 1);
  assert.equal(merged.find((project) => project.slug === "jesmond")!.id, 1234);
  const archiveSlug = "pinch-pleat-curtains-oxford-oxford";
  const archive = { ...record, slug: archiveSlug, id: 8 };
  const updated = mergePortfolioProjects([archive]).find((project) => project.slug === archiveSlug)!;
  assert.equal(updated.id, 8);
  assert.equal(updated.slug, archiveSlug);
  assert.equal(updated.title, portfolio.archive[archiveSlug].title);
});

test("Jesmond combines the two owner-identified sets, and confirmed names and height remain correct", () => {
  const jesmond = portfolio.projects.jesmond;
  assert.ok(jesmond.media.some((image) => image.src.includes("jesmond-detail")));
  assert.ok(jesmond.media.some((image) => image.src.includes("jesmond-2")));
  assert.equal(portfolio.projects.newcastle, undefined);
  assert.equal(portfolio.projects["hemel-hempstead"].label, "Hemel Hempstead");
  assert.equal(portfolio.projects.cotswold.label, "Cotswold");
  assert.equal(portfolio.projects.rickmansworth.label, "Rickmansworth");
  const height = portfolio.projects["five-metre-motorised-curtains"].facts.find((fact) => fact.value === "Five metres");
  assert.equal(height?.label, "Window height");
});
