"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="atelier">
      <main className="at-main">
        <span className="at-eyebrow">APEX ATELIER</span>
        <h1>We could not open the workspace.</h1>
        <p>Your saved projects are safe. Please try again in a moment.</p>
        <button className="at-button" onClick={reset}>
          Try again
        </button>
      </main>
    </div>
  );
}
