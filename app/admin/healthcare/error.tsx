"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-10">
      <h1>Healthcare workspace unavailable</h1>
      <p>
        Your account must be an authorised Apex staff member. If an update
        failed, reopen the enquiry and check the saved information before
        retrying.
      </p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
