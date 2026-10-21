"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { errorMessage } from "@/lib/api";
import "../register/Auth.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      router.push(searchParams.get("next") || "/");
    } catch (err) {
      setError(errorMessage(err, "Invalid email or password."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="authPage">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Log In</h1>

        {error && <p className="authError">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Log In"}
        </button>

        <p className="authSwitch">
          Don&apos;t have an account?{" "}
          <Link href={`/register${searchParams.get("next") ? `?next=${searchParams.get("next")}` : ""}`}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
