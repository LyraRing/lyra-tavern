export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
        {/* Inner Pulse */}
        <div className="absolute inset-0 m-6 rounded-full bg-orange-200 animate-pulse"></div>
      </div>
    </div>
  );
}
