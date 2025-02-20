const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="group">
      <div className="flex items-center w-[90%] mt-5 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Image container with hover effect */}
        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-[1.02]">
          <img 
            src={image} 
            alt="Card Image" 
            className="h-[3rem] w-auto object-cover rounded transition-transform duration-300 group-hover:brightness-110" 
          />
        </div>

        {/* Content section with enhanced typography */}
        <div className="ml-4 flex-grow">
          <h2 className="text-lg text-white font-medium transition-colors duration-300 group-hover:text-purple-400">
            {title}
          </h2>
          <p className="text-gray-500 mb-3 text-sm tracking-wide">
            {date}
          </p>
        </div>

        {/* Comments section with glass effect */}
        <div className="flex-shrink-0 mb-5 flex justify-end items-center">
          <div className="text-white text-lg px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            {comments}
          </div>
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default VideoCard;