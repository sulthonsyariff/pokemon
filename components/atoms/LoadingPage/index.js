export default function LoadingPage() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden bg-app-dark opacity-80 z-50 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    </div>
  );
}
