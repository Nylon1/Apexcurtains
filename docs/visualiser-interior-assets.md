# Furnished visualiser asset provenance

18 October 2026. Generated using the built-in image generation tool (not the API/CLI fallback), with real Apex installation images as architectural references. These are illustrative interiors, not evidence of finished rooms. No original gallery photography was overwritten. The UI and supporting text label the distinction and link to the real projects.

## Saved assets and generation briefs

- `public/visualiser/sources/double-pinch-room.webp`: Oxford reference; a warm contemporary furnished gable living room, preserving the broad sloping roofline and double-pinch curtain arrangement. Matte plain stone fabric, believable fullness, full floor contact and tied-back glazing relationship. Cream sofa, wool rug, travertine table, armchair, timber floor and garden daylight. Landscape 4:3, interior editorial photography, no words or interface. Built-in output: `exec-dccb4582-a989-448b-8869-b67bc81a1ce3.png`.
- `public/visualiser/sources/pencil-pleat-room.webp`: Peterborough reference; a serene loft bedroom preserving the steep triangular white French doors, timber mullion and dense gathered pencil-pleat heading. Matte pale stone curtains, low linen bed to the left, oak chest/lamp, bench to the right, wool rug and oak floor. Keep curtain geometry and floor relationship credible; no people, words or interface. Built-in output: `exec-be9bb6aa-e940-4b8b-b1ef-d100883f2700.png`.
- `public/visualiser/sources/wave-pleat-room.webp`: Milton Keynes architectural reference; a contemporary apex lounge with continuous rounded S-shaped wave folds following the slope, no pencil gathering or pinched heading. Sofa, chair, oak coffee table, rug, natural timber floor and daylight greenery. Preserve the shaped window and tied-back curtain relationship. No people, reflections of people, words or interface. Built-in output: `exec-4f3aa20f-135d-4baf-9024-d0912145a895.png`.

The generation briefs above record the final direction for each asset. All three outputs are 1448 × 1086. The originals are under the task's `CODEX_HOME/generated_images` folder; the project uses the locally saved WebP sources above. `scripts/prepare-visualiser-assets.mjs` reproducibly prepares 720px mobile, 1200px desktop and thumbnail derivatives and records hashes in `lib/visualiser/assets.json`.

## Rendering and material selection

`scene-sources.json` preserves the gallery reference, scene identity, heading and curtain paths. `scene-materials.json` contains traced wall/floor/main-upholstery boundaries, object exclusions and illustrative light positions in the fixed image coordinate space. The material controls do not imply Apex supplies these furniture/paint/floor products. Oslo names and display values continue to come from the governed fabric data and supplier swatches.

The visualiser is an inspiration preview. It does not establish surveyed window dimensions, exact fabric colour, opening geometry or blackout performance. A physical sample and specialist survey remain the basis for specification.
