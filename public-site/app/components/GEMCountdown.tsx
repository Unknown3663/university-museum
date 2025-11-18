"use client";

import { useState, useEffect } from "react";

export default function GEMCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Grand Egyptian Museum opening: November 1, 2025, 8:00 AM Cairo Time (UTC+2)
    const targetDate = new Date("2025-11-01T08:00:00+02:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              The Grand Egyptian Museum is Now Open! 🎉
            </h3>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Experience the world's largest archaeological museum, showcasing
              the magnificence of ancient Egyptian civilization.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white/90 text-sm sm:text-base font-semibold uppercase tracking-wider">
              Historic Moment
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Grand Egyptian Museum Opening
          </h3>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Countdown to the official opening of the world's largest
            archaeological museum
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white text-sm sm:text-base font-medium">
              November 1, 2025 | 8:00 AM Cairo Time
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Days */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 transform transition-all hover:scale-105">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 tabular-nums">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-wider font-semibold">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 transform transition-all hover:scale-105">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-wider font-semibold">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 transform transition-all hover:scale-105">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-wider font-semibold">
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 transform transition-all hover:scale-105">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 tabular-nums">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-wider font-semibold">
              Seconds
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 sm:mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white/90 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Giza, Egypt</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>100,000+ Artifacts</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>World's Largest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
