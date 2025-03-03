"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B4332] to-[#081C15]">
      <div className="text-center px-4">
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-4">
          Something went wrong!
        </h2>
        <p className="text-[#F5F5F5] mb-8">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#2F855A] hover:bg-[#143728] text-[#F5F5F5] font-bold py-3 px-6 rounded-full transition-colors duration-300 mr-4"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-block bg-[#A3A830] hover:bg-[#828622] text-[#F5F5F5] font-bold py-3 px-6 rounded-full transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
