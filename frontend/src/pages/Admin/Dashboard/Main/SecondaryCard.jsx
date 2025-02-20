const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div
      className={`w-[15rem] h-[12rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg ml-5 group overflow-hidden`}
    >
      {/* Animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Pill with subtle glow */}
      <div
        className={`absolute -top-4 left-[70px] mt-5 border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5`}
      >
        {pill}
      </div>

      {/* Content container with subtle animation */}
      <div className="flex items-center justify-center h-full transition-transform duration-300 group-hover:scale-[1.02]">
        <h2 className="text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          {content}
        </h2>
      </div>

      {/* Info with glass effect */}
      <div className="absolute bottom-4 left-12 text-sm text-white backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-white/20">
        {info}
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors duration-300" />
    </div>
  );
};

export default SecondaryCard;