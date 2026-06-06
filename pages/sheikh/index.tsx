import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import IITLogo from "@layouts/components/IITLogo";
import { getSheikhSession } from "@lib/sheikh/session";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSheikhSession(req, res);
  if (session.isLoggedIn) {
    return {
      redirect: { destination: "/sheikh/dashboard", permanent: false },
    };
  }
  return { props: {} };
};

const SheikhLogin = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sheikh/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      router.push("/sheikh/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sheikh — IIT</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AuroraBackground>
        <div className="flex min-h-screen flex-1 items-center justify-center px-6">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="fm-card w-full max-w-sm rounded-2xl border border-white/50 bg-white/85 p-8 shadow-lg backdrop-blur-md"
          >
            <div className="flex justify-center">
              <IITLogo size={56} />
            </div>
            <h1 className="font-pp mt-6 text-center text-2xl text-[#2c2c2c]">
              Only One May Enter
            </h1>

            <label
            htmlFor="sheikh-password"
            className="mt-8 block text-xs uppercase tracking-widest text-[#646464]"
          >
            Password
          </label>
          <input
            id="sheikh-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#dee2de] bg-white/90 px-4 py-3 text-sm focus:border-[#b8beb8] focus:outline-none"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="mt-3 text-center text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-black py-3 font-pp text-white hover:bg-[#2c2c2c] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
          </motion.form>
        </div>
      </AuroraBackground>
    </>
  );
};

export default SheikhLogin;
