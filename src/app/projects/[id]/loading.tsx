export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B4332] to-[#081C15]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A3A830]"></div>
        <h2 className="mt-4 text-xl font-semibold text-[#F5F5F5]">Loading...</h2>
      </div>
    </div>
  );
} 