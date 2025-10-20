"use client";
import { useState } from "react";

export const Feture = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          className="max-w-3xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="AI Resume Builder Features"
        />
        <div
          className="px-3 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors ${
                !isHover ? "border-violet-300 bg-violet-100" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-violet-600"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  AI-Powered Resume Creation
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Generate professional, recruiter-friendly resumes in minutes
                  using AI intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-green-600"
              >
                <path d="M4 21v-4a4 4 0 014-4h8a4 4 0 014 4v4" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Tailored Job Optimization
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  AI matches your resume to specific job descriptions for higher
                  chances of getting interviews.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h16M4 6h16M4 18h16" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Customizable Templates
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Choose from professional, ATS-friendly templates and tailor
                  your resume style with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
