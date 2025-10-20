import Image from "next/image";
import Link from "next/link";

export default function Promotion() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Text */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              AI-powered
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Build a standout resume in minutes.
            </h1>

            <p className="mt-4 text-gray-600 max-w-lg leading-relaxed">
              Our AI Resume Builder generates tailored, modern resumes and cover
              letters based on your experience and the job you want — clean
              layouts, ATS-friendly formatting, and keyword optimization.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-indigo-600 text-white text-sm font-medium shadow hover:scale-[.99] transition-transform"
                aria-label="Create your resume"
              >
                Create resume
              </Link>

              <Link
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:shadow-sm transition"
                aria-label="See features"
              >
                See features
              </Link>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 max-w-md">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white shadow flex items-center justify-center text-indigo-600">
                  ⚡
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fast</p>
                  <p className="text-xs text-gray-500">
                    Resume in under 5 minutes
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white shadow flex items-center justify-center text-indigo-600">
                  📄
                </div>
                <div>
                  <p className="font-medium text-gray-900">ATS-friendly</p>
                  <p className="text-xs text-gray-500">
                    Pass applicant tracking systems
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white shadow flex items-center justify-center text-indigo-600">
                  🤝
                </div>
                <div>
                  <p className="font-medium text-gray-900">Custom</p>
                  <p className="text-xs text-gray-500">Tailored for each job</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Mockups */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[360px] sm:w-[420px]">
              {/* Card stack */}
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-[340px] sm:w-[400px] h-[220px] bg-white border border-gray-100 rounded-2xl shadow-md transform rotate-[-4deg]" />
                <div className="absolute left-0 top-6 w-[340px] sm:w-[400px] h-[220px] bg-white border border-gray-100 rounded-2xl shadow-md transform rotate-[3deg]" />

                <div className="relative bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          Jane Cooper
                        </p>
                        <p className="text-xs text-gray-500">
                          Frontend Developer
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          4.8
                        </p>
                        <p className="text-xs text-gray-500">Profile score</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">Experience</p>
                        <p className="text-gray-500">3 yrs</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-500">Remote</p>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-600">
                      Generated summary: Skilled React developer who builds
                      accessible and performant web apps. Optimized for product
                      teams and startups.
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="flex items-center justify-between">
                      <Link
                        className="text-sm font-semibold text-indigo-600"
                        href="#"
                      >
                        View full resume
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent floating badge */}
              <div className="absolute -bottom-4 -right-6 bg-white border border-gray-100 rounded-xl p-2 shadow-md">
                <Image
                  src="/promotion1.png"
                  alt="badge"
                  width={96}
                  height={96}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
