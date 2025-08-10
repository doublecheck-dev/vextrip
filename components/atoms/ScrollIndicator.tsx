export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
      </div>
    </div>
  );
}
