export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-600 rounded-full animate-spin"></div>
    </div>
  );
}
