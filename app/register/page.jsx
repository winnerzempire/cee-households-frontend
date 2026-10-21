"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { errorMessage } from "@/lib/api";
import "./Auth.css";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
      await register(form);
      router.push(searchParams.get("next") || "/");
    } catch (err) {
      setError(errorMessage(err, "Could not create your account."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="authPage">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {error && <p className="authError">{error}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First name"
          required
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          required
          value={form.lastName}
          onChange={handleChange}
        />

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
          minLength={8}
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create Account"}
        </button>

        <p className="authSwitch">
          Already have an account?{" "}
          <Link href={`/login${searchParams.get("next") ? `?next=${searchParams.get("next")}` : ""}`}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
