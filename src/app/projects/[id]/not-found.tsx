import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B4332] to-[#081C15]">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#A3A830] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-4">Page Not Found</h2>
        <p className="text-[#F5F5F5] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block bg-[#2F855A] hover:bg-[#143728] text-[#F5F5F5] font-bold py-3 px-6 rounded-full transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 