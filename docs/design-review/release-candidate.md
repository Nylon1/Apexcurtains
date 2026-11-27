# Final design and release review

Application commit `8f03451` is available on the [protected design preview](https://apexcurtains-43nc-mgjcp54xw-hamzas-projects-4ef62f35.vercel.app) and [draft PR 45](https://github.com/Nylon1/Apexcurtains/pull/45). Production approval is pending. The reference for the original design and strategic expansion is `a92f870`. The production recovery target is recorded below.

## Visual and commercial review

The Oxford gable remains the first photograph. The opening now names shaped glazing, double-height rooms, wide glazing and motorised operation. The four specialisms remain individually linked. Two promotional headings have been replaced with descriptions of the work. The mobile Peterborough crop preserves the roof peak, hem and doors. Older apex guidance and the project gallery retain their shared masthead, reading type and established enquiry links.

The motorised plan labels the main curtain on the room side and the voile nearest the glass. Its caption explains that arrangement for readers who cannot see the drawing. The planner now identifies photos, drawings and measurements as optional before the first question. Desktop navigation, mobile navigation, reduced-motion curtain operation, trade preselection and upload retry were included in the browser review.

| Candidate view | Desktop | Mobile |
| --- | --- | --- |
| Homepage opening | [1440px](release/home-1440.jpg) | [390px](release/home-390.jpg) |
| Selected projects | [1440px](release/projects-1440.jpg) | [390px](release/projects-390.jpg) |
| Four specialisms | [1440px](release/specialisms-1440.jpg) | [390px](release/specialisms-390.jpg) |
| Established apex guide | [1440px](release/legacy-1440.jpg) | [390px](release/legacy-390.jpg) |
| Portfolio | [1440px](release/gallery-1440.jpg) | [390px](release/gallery-390.jpg) |
| Motorised track drawing | [1440px](release/layers-1440.jpg) | [390px](release/layers-390.jpg) |
| Project planner | [1440px](release/planner-1440.jpg) | [390px](release/planner-390.jpg) |
| Tall window guide | [1440px](release/tall-1440.jpg) | [390px](release/tall-390.jpg) |
| Original quotation choice | [1440px](release/quote-1440.jpg) | [390px](release/quote-390.jpg) |

## Reconciled QA figures

| Scope | Interpretation |
| --- | --- |
| Indexed content | 194 sitemap URLs across 99 general pages, 14 projects, 71 area pages and 10 articles. The 186 count was the original production baseline. |
| Link destinations | 391 distinct internal paths and path–fragment combinations before the skip link. Adding one page-specific skip destination on each of the 194 pages gives 585. The total includes anchored destinations and linked routes outside the sitemap. |
| Layouts | 204 distinct routes or entry states at two widths give 408 layout checks. This includes nine additional public routes and the trade planner query. A separate sample used 11 pages at seven widths, giving 77 responsive checks. The earlier 51 checks belong to the strategic expansion phase. These overlapping samples should be read separately. |
| Accessibility and performance | The preceding design review tested 11 full pages at two widths with axe. Mobile Lighthouse samples measured 94 for the homepage and 98 for motorised systems. The desktop homepage measured 100. These are lab samples. Field Core Web Vitals and Search Console data are outstanding. |
| Visual evidence | 79 images in the [before-and-after review](README.md). This final inspection adds 18 images of nine views, each at 390px and 1440px. |

The clean final build passed all 408 route and width checks. The authenticated preview returned 200 for all 194 sitemap pages and robots.txt. Link verification found no missing fragments or destinations among the 585 checked. The final application build and TypeScript check passed, as did the specialist HTML, architecture, redirects, visualiser, sitemap and SEO checks. The homepage retains its tested made-to-measure wording. The final screenshot run decoded visible images and checked the heading and horizontal fit on each of its 18 views.

## Business inbox

Verified directly in IONOS Mail Business. The **Inbox** for `hello@apexcurtains.com` contained **Architectural curtain enquiry – Private residence** at 11:10 GMT on 27 November 2026. The opened message showed the matching test reference `APEX-PREVIEW-QA-20261127` in the submitted name and project notes. This confirms mailbox receipt for the labelled preview enquiry. The design review used simulated submissions for upload and retry checks.

## Release decision

Ready for final owner approval. The published guides assess curtain drop, cloth, track, structure and access per project. Forest motor capacities are manufacturer figures qualified by the specified configuration. Trade responsibilities remain subject to agreement. The London and five-metre-window stories are unpublished pending records and permissions. Additional photography can follow launch.

## Rollback plan

1. Before an approved production deployment, the release owner records the current deployment behind both Apex domains and the reviewed PR head. At this review the ready deployment behind www.apexcurtains.com was `dpl_BZSHccV1V9frYaQ48gvbv8Jcxnk1` and the PR base was `680b096`. Refresh the target if another release ships first.
2. After an approved release, check the homepage, apex and gable guides, portfolio, mobile navigation, original quotation entry and planner from the production domain. Verify the canonical host, sitemap and an explicitly labelled enquiry in the business mailbox.
3. If the release breaks an established quote route, fails to deliver enquiries, or serves incorrect canonical or indexing directives, the release owner can use Instant Rollback in the Vercel project, selecting the recorded previous production deployment. CLI equivalent from the linked project is `vercel rollback <previous-production-deployment-id>`. Verify the deployment ID and production aliases before confirming.
4. Check the restored homepage, apex and gable pages, original quotation route and production sitemap. Verify enquiry handling and retain failed enquiry references for manual follow-up. A deployment rollback does not recall sent mail. Revert the release change in source control through a reviewed PR before the next promotion.

Rollback instructions were checked against the linked project and installed CLI. No production promotion or rollback was performed.
