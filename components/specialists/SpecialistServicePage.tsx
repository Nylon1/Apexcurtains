import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { specialistEditions, specialistProject, type SpecialistKey, type ProjectReference } from "@/lib/specialist-editions";
import { architecturalGuides, architecturalPlannerPath, type ArchitecturalGuide } from "@/lib/architectural-curtains";
import { architecturalPresentation } from "@/lib/architectural-presentation";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import ArchitectureDrawing from "@/components/architecture/ArchitectureDrawing";
import CurtainMotion from "@/components/architecture/CurtainMotion";
import "@/components/architecture/architecture.css";
import "./specialists.css";

type Question = { q: string; a: string };
function Photo({ reference, eager = false, caption }: { reference: ProjectReference; eager?: boolean; caption?: string }) {
  const project = specialistProject(reference.slug);
  const photo = project.media[reference.image || 0];
  return <figure className="spec-photo"><Link href={`/gallery/${reference.slug}`} aria-label={`Explore ${project.label}: ${project.title}`}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 800px) 90vw, 55vw" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} /></Link><figcaption>{caption || `${project.label} · ${photo.caption}`} <Link href={`/gallery/${reference.slug}`}>Project story ↗</Link></figcaption></figure>;
}
function Film({ slug, title, hero = false }: { slug: string; title?: string; hero?: boolean }) {
  const project = specialistProject(slug);
  const film = project.film;
  if (!film) return null;
  const captionId = `film-${slug}`;
  const player = <figure className="spec-player"><video controls playsInline preload="none" poster={film.poster} aria-label={project.title} aria-describedby={captionId}><source src={film.src} type="video/mp4" /><a href={film.src}>Watch the installation film</a></video><figcaption id={captionId}>{film.description}</figcaption></figure>;
  if (hero) return player;
  return <section className="spec-film" id="installation-film"><div className="studio-wrap spec-film-layout"><div><p className="spec-kicker">An Apex installation / In motion</p><h2>{title}</h2><p>{project.technical.text}</p><Link className="spec-link" href={`/gallery/${slug}`}>Explore the complete project ↗</Link></div>{player}</div></section>;
}
function ApexDrawing() {
  return <figure className="spec-elevation"><svg viewBox="0 0 600 420" role="img" aria-label="Illustrative apex elevation: supported shaped heading, retained fabric along the slopes and a separate horizontal sheer track."><g fill="none" stroke="currentColor" strokeWidth="2"><path d="M125 340V180L300 55 475 180V340Z M300 55V340 M125 218H475"/><path className="spec-brass" strokeWidth="5" d="M110 178 300 40 490 178"/><path className="spec-cloth" d="M112 180 292 48Q270 185 160 265L145 340H105L118 260Z M488 180 308 48Q330 185 440 265L455 340H495L482 260Z"/><path strokeDasharray="5 5" d="M172 224H428 M172 230V340 M428 230V340"/><path d="M295 40V20H410 M170 250H34 M350 224V385H470"/></g><g fill="currentColor" fontSize="15"><text x="415" y="25">Shaped heading</text><text x="25" y="274">Retained cloth</text><text x="365" y="408">Separate sheer line</text></g></svg><figcaption><strong>Shape and movement are separate decisions.</strong> Illustrative elevation, not a construction drawing. The actual route, support and clearance are assessed for each window.</figcaption></figure>;
}
function Principle({ name }: { name: SpecialistKey }) {
  const page = specialistEditions[name];
  return <section className="spec-principle studio-wrap" id="design-details"><div className="spec-section-intro"><p className="spec-kicker">The design decisions</p><h2>{page.principle.title}</h2><p>{page.principle.text}</p></div><div className="spec-principle-grid"><div className="spec-drawing">{page.diagram === "apex" ? <ApexDrawing /> : <ArchitectureDrawing kind={page.diagram} />}</div><ol className="spec-decisions">{page.principle.points.map((point, index) => <li key={point.title}><span className="spec-number">0{index + 1}</span><div><h3>{point.title}</h3><p>{point.text}</p></div></li>)}</ol></div></section>;
}
function Projects({ name }: { name: SpecialistKey }) {
  const edition = specialistEditions[name];
  return <section className="spec-projects studio-wrap" id="related-projects"><div className="spec-section-heading"><div><p className="spec-kicker">From the portfolio</p><h2>{name === "workroom" ? "The construction, in the room." : name === "install" ? "The work behind the finish." : "See the decisions in place."}</h2></div><Link className="spec-link" href="/gallery">Explore all projects ↗</Link></div><div className="spec-project-grid">{edition.projects.map(reference => { const project = specialistProject(reference.slug); return <article key={reference.slug}><Photo reference={reference} /><p className="spec-kicker">{project.label}</p><h3><Link href={`/gallery/${reference.slug}`}>{project.title}</Link></h3><p>{reference.reason}</p></article>; })}</div></section>;
}
function Consultation({ name }: { name: SpecialistKey }) {
  const edition = specialistEditions[name];
  return <section className="spec-consultation" id="consultation"><div className="studio-wrap spec-consultation-grid"><div><p className="spec-kicker">Begin with a conversation</p><h2>{edition.consultation}</h2><p>Share what you know now. We can discuss the design, the information still needed and the appropriate survey or specialist service.</p><div className="spec-actions"><Link href={architecturalPlannerPath} className="studio-button">Discuss your project ↗</Link>{name === "workroom" || name === "scale" ? <Link className="spec-link" href={`${architecturalPlannerPath}?type=trade`}>Discuss a trade brief</Link> : <Link className="spec-link" href="/start-designing">Start with a window photo</Link>}</div></div><div className="spec-brief"><h3>Useful for the first discussion</h3><ul>{edition.prepare.map(item => <li key={item}>{item}</li>)}</ul><Link className="spec-link" href="/contact">Prefer to talk to the team?</Link><Link className="spec-link" href="/reviews#customer-stories">Read customer reviews ↗</Link></div></div></section>;
}
function Technical({ guide, questions }: { guide?: ArchitecturalGuide; questions: Question[] }) {
  return <section className="spec-technical studio-wrap" id="technical-guidance"><div className="spec-section-intro"><p className="spec-kicker">Planning your specification</p><h2>{guide ? "The details worth resolving early." : "Questions about your window."}</h2></div>{guide && <div className="spec-technical-grid">{guide.sections.map((section) => <section id={section.id} key={section.id}><h3>{section.title}</h3>{section.id === "online-ordering" ? <p>Before ordering, confirm that the proposed dimensions and cloth are within the supplier’s range. Agree who verifies the measurements, make-up, fixing, operation and access. A workroom review is needed where a standard ordering option does not cover the brief.</p> : section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>}<div id="common-question" className="spec-faq">{questions.map(({q,a}) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>{guide?.sources?.some(source => !source.href.includes("dunelm")) && <div id="technical-references" className="spec-references"><p className="spec-kicker">Technical references</p>{guide.sources.filter(source => !source.href.includes("dunelm")).map(source => <a key={source.href} href={source.href}>{source.label} ↗</a>)}</div>}{guide && <nav className="spec-related" aria-label="Related specialist guidance">{guide.related.map(link => <Link key={link.href} href={link.href}>{link.label} ↗</Link>)}</nav>}</section>;
}
function Hero({ name }: { name: SpecialistKey }) {
  const page = specialistEditions[name];
  const copy = <div className="spec-hero-copy"><h1><span className="spec-service-name">{page.label} / The Apex approach</span>{page.title}<br /><em>{page.accent}</em></h1><p className="spec-lead">{page.intro}</p><div className="spec-actions"><Link className="studio-button" href={architecturalPlannerPath}>{name === "install" ? "Discuss your installation" : name === "workroom" ? "Discuss the making" : "Discuss your project"} ↗</Link><a className="spec-link" href={name === "motors" ? "#technical-tool" : "#design-details"}>{name === "motors" ? "Try the movement demonstration" : "Explore the design details"}</a></div></div>;
  return <header className="spec-hero"><div className="studio-wrap"><nav className="spec-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/curtain-solutions">Curtain solutions</Link><span>/</span><span aria-current="page">{page.label}</span></nav><div className="spec-hero-grid">{copy}{name === "motors" ? <div><Film slug="five-metre-motorised-curtains" hero /><p className="spec-measure-note">{page.heroNote}</p></div> : name === "gable" ? <div className="spec-open-closed"><Photo reference={page.hero} eager caption="Open · The tied-back arrangement" /><Photo reference={{slug:"windermere",image:1}} eager caption="Closed · Fabric across the gable" /></div> : <Photo reference={page.hero} eager caption={page.heroNote} />}</div></div></header>;
}
const shapedLinks = [{href:"/curtain-tracks",label:"Curtain tracks & support"},{href:"/curtain-linings",label:"Linings & light control"},{href:"/curtain-headings",label:"Heading construction"},{href:"/curtain-tiebacks",label:"Tiebacks & the open view"}];
export default function SpecialistServicePage({ name, questions: supplied = [] }: { name: SpecialistKey; questions?: Question[] }) {
  const edition = specialistEditions[name];
  const guide: ArchitecturalGuide | undefined = name === "apex" || name === "gable" ? undefined : architecturalGuides[name];
  const presentation = guide ? architecturalPresentation[guide.path] : undefined;
  const questions = supplied.length ? supplied : presentation ? [{q:presentation.question,a:presentation.answer}] : [];
  const schemas = [serviceSchema({name:edition.label,description:edition.intro,url:edition.path}),breadcrumbSchema([{name:"Home",url:"/"},{name:"Curtain solutions",url:"/curtain-solutions"},{name:edition.label,url:edition.path}]),{"@context":"https://schema.org","@type":"FAQPage",mainEntity:questions.map(({q,a})=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}];
  const film = edition.film && <Film slug={edition.film} title={edition.filmTitle} />;
  let narrative: ReactNode;
  switch (name) {
    case "apex": narrative = <><Principle name={name}/><section className="spec-detail-story studio-wrap"><Photo reference={{slug:"jesmond",image:2}}/><div><p className="spec-kicker">Jesmond / A closer look</p><h2>Two lines.<br/><em>Two roles.</em></h2><p>{specialistProject("jesmond").technical.text}</p><Link className="spec-link" href="/gallery/jesmond">Explore the layered room ↗</Link></div></section><Projects name={name}/></>; break;
    case "gable": narrative = <><section className="spec-statement studio-wrap"><p>A window is experienced<br/><em>open as well as closed.</em></p><div><p>{specialistProject("windermere").interior.text}</p><Link className="spec-link" href="/gallery/windermere">Read the Windermere story ↗</Link></div></section><Projects name={name}/><Principle name={name}/></>; break;
    case "tall": narrative = <><Principle name={name}/>{film}<Projects name={name}/></>; break;
    case "scale": narrative = <><Principle name={name}/>{film}<Projects name={name}/></>; break;
    case "motors": narrative = <><Principle name={name}/><div className="spec-motion studio-wrap"><CurtainMotion /></div>{film}<Projects name={name}/></>; break;
    case "install": narrative = <><div className="spec-process studio-wrap" aria-label="Installation stages"><span>01 / Survey & support</span><span>02 / Access & handling</span><span>03 / Fitting & dressing</span></div>{film}<Principle name={name}/><Projects name={name}/></>; break;
    case "workroom": narrative = <><Principle name={name}/><Projects name={name}/><aside className="spec-making-note studio-wrap"><p className="spec-kicker">Manufacture-only or a complete service</p><h2>Agree where the responsibilities sit.</h2><p>For a trade brief, confirm who owns the dimensions, cloth specification, track selection and installation. The making plan needs that information before the cut.</p><Link className="spec-link" href={`${architecturalPlannerPath}?type=trade`}>Share a manufacture-only brief ↗</Link></aside></>; break;
  }
  return <main className={`spec-page spec-${name}`}>{schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>)}<Hero name={name}/><nav className="spec-jump studio-wrap" aria-label="On this page"><a href="#design-details">Design details</a><a href="#related-projects">Related installations</a>{edition.film && <a href="#installation-film">Installation film</a>}<a href="#technical-guidance">Technical guidance</a><a href="#consultation">Your consultation</a></nav>{narrative}<Technical guide={guide} questions={questions}/>{!guide && <nav className="spec-related studio-wrap" aria-label="Related specialist guidance">{shapedLinks.map(link=><Link href={link.href} key={link.href}>{link.label} ↗</Link>)}</nav>}<Consultation name={name}/></main>;
}
