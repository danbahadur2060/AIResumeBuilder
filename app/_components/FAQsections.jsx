"use client";
import Link from "next/link";
import React, { useState } from "react";

/**
 * FAQ component — attractive, accessible, animated, and tailored for an AI Resume Builder.
 * Requires Tailwind CSS and should be placed inside a page/component in your Next.js app.
 */
const faqsData = [
  {
    question: "How does the AI generate my resume?",
    answer:
      "Our AI analyzes your input (experience, skills, job target) and generates a concise, ATS-friendly resume with optimized keywords and a professional layout.",
  },
  {
    question: "Will my resume pass Applicant Tracking Systems (ATS)?",
    answer:
      "Yes — templates are designed for ATS compatibility: clean structure, standard headings, and no hidden formatting that could break parsing.",
  },
  {
    question: "Can I customize the template and wording?",
    answer:
      "Absolutely. After generation you can edit content, switch templates, adjust section order and fine-tune the language to match your voice.",
  },
  {
    question: "Is my personal data secure and private?",
    answer:
      "We prioritize privacy: inputs are encrypted in transit, stored only when you opt to save, and never sold to third parties. You can delete your data anytime.",
  },
  {
    question: "What export formats are supported?",
    answer:
      "You can download your resume as PDF (print-ready) and PNG. We also offer copy-to-clipboard for easy pasting into job portals.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              AI Resume Builder
            </p>

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently asked questions
            </h2>

            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Quick answers to common questions — everything you need to
              confidently build and download an optimized resume.
            </p>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">
                          {index + 1}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-slate-900">
                          {faq.question}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 hidden sm:block">
                          {isOpen
                            ? "Open — more details below"
                            : "Tap to reveal the answer"}
                        </p>
                      </div>
                    </div>

                    {/* chevron */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen
                          ? "bg-indigo-600 text-white rotate-180"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                      aria-hidden
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* panel */}
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={`px-5 pb-5 transition-[max-height,opacity,transform] duration-500 ease-in-out ${
                      isOpen
                        ? "opacity-100 max-h-[1000px] transform translate-y-0"
                        : "opacity-0 max-h-0 -translate-y-2"
                    }`}
                    style={{ willChange: "max-height, opacity, transform" }}
                  >
                    <p className="text-sm text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[0.995] transition-transform"
            >
              Create your resume — it's free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
