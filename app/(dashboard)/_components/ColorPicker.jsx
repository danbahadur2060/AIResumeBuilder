"use client";
import React, { useState, useRef, useEffect } from "react";
import { PaintBucket, Check, Copy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props:
 *  - selectedColor: string (hex)
 *  - onChange: (hex: string) => void
 *
 * Usage:
 *  <ColorPicker selectedColor={color} onChange={setColor} />
 */

const DEFAULT_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Brown", value: "#854D3D" },
  { name: "Gray", value: "#6B7280" },
  { name: "Black", value: "#1F2937" },
  { name: "Custom", value: "custom" },
];

// Small util: returns true if color is light enough to use dark icon
function isLight(hex) {
  try {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    // Perceived luminance
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 180;
  } catch {
    return false;
  }
}

const ColorPicker = ({ selectedColor, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colors] = useState(DEFAULT_COLORS);
  const [customHex, setCustomHex] = useState(
    selectedColor && selectedColor !== "custom" ? selectedColor : "#000000"
  );
  const [showCopied, setShowCopied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Close on outside click
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    // When selectedColor changes externally, sync customHex
    if (selectedColor && /^#([0-9A-F]{6})$/i.test(selectedColor)) {
      setCustomHex(selectedColor);
    }
  }, [selectedColor]);

  function handleSelect(hex) {
    if (hex === "custom") {
      // open custom panel and don't close; user will pick
      setIsOpen(true);
      return;
    }
    onChange(hex);
    setIsOpen(false);
  }

  function applyCustom() {
    // sanitize hex
    let sanitized = customHex.trim();
    if (!sanitized.startsWith("#")) sanitized = "#" + sanitized;
    if (/^#([0-9A-F]{6})$/i.test(sanitized)) {
      onChange(sanitized.toUpperCase());
      setIsOpen(false);
    } else {
      // if invalid, keep open - user can edit
      // you might want to show a validation message here
    }
  }

  async function copyHex() {
    try {
      const hexToCopy =
        selectedColor === "custom" ? customHex : selectedColor || customHex;
      await navigator.clipboard.writeText(hexToCopy);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  function handleKeyDownOnSwatch(e, hex) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(hex);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="flex items-center gap-2 cursor-pointer text-sm font-medium text-purple-700 
                   bg-gradient-to-br from-purple-100 to-purple-300 px-3 py-2 rounded-lg ring-1 ring-purple-200 hover:scale-[1.01] transition-transform shadow-sm"
      >
        <PaintBucket size={16} />
        <span className="max-sm:hidden">Accent</span>
        <span
          className="ml-2 w-5 h-5 rounded-full border"
          style={{ backgroundColor: selectedColor === "custom" ? customHex : selectedColor }}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 w-64 p-3 mt-2 z-20 bg-white rounded-lg border border-gray-200 shadow-lg"
            role="dialog"
            aria-label="Color picker"
          >
            <div className="grid grid-cols-5 gap-3">
              {colors.map((c) => {
                const isSelected =
                  (c.value !== "custom" && selectedColor === c.value) ||
                  (c.value === "custom" && selectedColor === "custom");
                const displayHex = c.value === "custom" ? customHex : c.value;
                return (
                  <div key={c.value} className="flex flex-col items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`${c.name} ${displayHex}`}
                      onClick={() => {
                        if (c.value === "custom") {
                          // ensure custom focused
                          setTimeout(() => {
                            const inp = containerRef.current?.querySelector("input[type='color']");
                            inp?.focus();
                          }, 50);
                        }
                        handleSelect(c.value);
                      }}
                      onKeyDown={(e) => handleKeyDownOnSwatch(e, c.value)}
                      className="w-10 h-10 rounded-full border-2 cursor-pointer flex items-center justify-center relative transform transition-all hover:scale-105"
                      style={{
                        backgroundColor: displayHex,
                        borderColor: isSelected ? "#2563EB" : "transparent",
                      }}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={
                            isLight(displayHex) ? "text-gray-900" : "text-white"
                          }
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 text-center">{c.name}</p>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-3 border-t" />

            {/* Custom color area */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Selected</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{
                      backgroundColor: selectedColor === "custom" ? customHex : selectedColor,
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        aria-label="hex input"
                        value={selectedColor === "custom" ? customHex : (selectedColor || customHex)}
                        onChange={(e) => {
                          const v = e.target.value.trim();
                          setCustomHex(v.startsWith("#") ? v.toUpperCase() : v.toUpperCase());
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") applyCustom();
                        }}
                        className="w-full rounded-md px-2 py-1 text-sm border focus:outline-none focus:ring-1"
                      />
                      <button
                        onClick={copyHex}
                        className="p-1 rounded-md ring-1 ring-gray-100 hover:scale-[1.03] transition"
                        title="Copy hex"
                        aria-label="Copy hex value"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Hex code</p>
                  </div>
                </div>
              </div>

              {/* Color input */}
              <div className="flex flex-col items-center gap-2">
                <input
                  type="color"
                  value={customHex.startsWith("#") ? customHex : `#${customHex.replace("#", "")}`}
                  onChange={(e) => setCustomHex(e.target.value.toUpperCase())}
                  aria-label="Pick a color"
                  className="w-10 h-10 p-0 border rounded"
                />
                <button
                  onClick={() => {
                    // set selected to custom but don't close until apply
                    onChange("custom");
                  }}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                  title="Use custom (apply below)"
                >
                  Use
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={applyCustom}
                  className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm hover:brightness-95 transition"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    onChange("#000000");
                    setIsOpen(false);
                  }}
                  className="px-3 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200 transition"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                {showCopied ? (
                  <div className="flex items-center gap-1">
                    <span>Copied</span>
                    <Check size={14} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="select-none">{selectedColor === "custom" ? (customHex || "-") : (selectedColor || "-")}</span>
                    <button
                      onClick={copyHex}
                      className="p-1 rounded-md ring-1 ring-gray-100 hover:brightness-95"
                      aria-label="copy hex"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="close picker"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
