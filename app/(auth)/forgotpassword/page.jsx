"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:block relative">
        <Image
          src="/lourginsideImage.png"
          alt="Forgot Password Illustration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-start p-10">
          <div className="text-white space-y-3">
            <h2 className="text-3xl font-semibold tracking-wide">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
              We’ll send a password reset link to your registered email address.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-10 py-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-sm w-full space-y-6 bg-white/70 backdrop-blur-lg  p-8 "
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Email Input */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-5 gap-2 bg-white hover:border-indigo-400 transition-all">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Success Message */}
          {sent && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              ✅ Reset link sent successfully to{" "}
              <span className="font-medium">{email}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-full cursor-pointer text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 transition-all shadow-md"
          >
            Send Reset Link
          </button>

          <p className="text-gray-500 text-sm text-center mt-4">
            Remembered your password?{" "}
            <Link className="text-indigo-600 hover:underline" href="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
