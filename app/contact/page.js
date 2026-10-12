"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only: no backend. Show a success message and reset the form.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-sky-700">Contact Us</h1>
      <p className="mb-6 text-center text-slate-600">
        Have a question or feedback? Send us a message.
      </p>

      {sent && (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-green-700">
          Thank you! Your message has been sent.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={inputClass} />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 py-2 font-medium text-white transition hover:bg-sky-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
