"use client";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";

const PersonalInfoForm = ({
  data = {},
  onChange = () => {},
  removeBackground = false,
  setRemoveBackground = () => {},
}) => {
  const [blobPreview, setBlobPreview] = useState(null);

  // helper to check if data.image is a File-like object
  const isFileLike = (value) =>
    value &&
    (value instanceof File ||
      (typeof value === "object" && typeof value.name === "string"));

  useEffect(() => {
    // create a blob url only when we have a File-like object
    if (isFileLike(data.image)) {
      const url = URL.createObjectURL(data.image);
      setBlobPreview(url);

      return () => {
        // revoke previous blob url when image/file changes or component unmounts
        URL.revokeObjectURL(url);
        setBlobPreview(null);
      };
    } else {
      // if image is not file-like, clear blobPreview
      setBlobPreview(null);
    }
  }, [data.image]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      <div className="flex items-center gap-2">
        <label className="cursor-pointer">
          {typeof data.image === "string" && data.image ? (
            <Image
              src={data.image}
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : // 2) If file uploaded -> use blobPreview in a regular <img />
          isFileLike(data.image) && blobPreview ? (
            <img
              src={blobPreview}
              alt="Profile Preview"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            // 3) fallback UI
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700">
              <User className="w-10 h-10 p-2.5 border rounded-full" />
              <span>Upload User Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleChange("image", file);
            }}
          />
        </label>

        {isFileLike(data.image) && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={!!removeBackground}
                aria-label="Remove background from uploaded image"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="w-4 h-4" />
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus-within:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
