"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button, Field } from "./Fields";
export default function AtelierLogin({ denied = false }: { denied?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(
      denied ? "Your account does not currently have staff access." : "",
    );
  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="atelier at-login">
      <div className="at-login-image">
        <Link href="/" className="at-wordmark">
          APEX <span>CURTAINS</span>
        </Link>
        <div>
          <span className="at-eyebrow">THE PRIVATE DESIGN STUDIO</span>
          <h1>
            Considered in
            <br />
            every detail.
          </h1>
          <p>From the first measurement to the finishing touch.</p>
        </div>
      </div>
      <div className="at-login-form">
        <span className="at-eyebrow">WELCOME TO YOUR ATELIER</span>
        <h2>
          A place for
          <br />
          <em>beautiful work.</em>
        </h2>
        <p>
          Sign in with your Apex staff account to manage surveys and personal
          curtain collections.
        </p>
        <form onSubmit={login}>
          <Field
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {error ? (
            <p className="at-error" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={busy}>
            {busy ? <Loader2 className="at-spin" size={17} /> : null}Enter the
            atelier
            <ArrowRight size={17} />
          </Button>
        </form>
        <Link href="/admin/atelier/demo" className="at-text-link">
          Explore an illustrative project <ArrowUpRight size={15} />
        </Link>
        <Link href="/" className="at-back">
          Return to Apex Curtains
        </Link>
      </div>
    </div>
  );
}
