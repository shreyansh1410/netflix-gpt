const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[50%] md:pt-[10%] px-4 md:px-16 absolute text-white ">
      {/* <p>Video Title</p> */}
      <h1 className="text-2xl md:text-6xl font-bold mt-[5%] md:mt-0">
        {title}
      </h1>
      <p className="hidden md:inline-block text-lg w-1/4 py-6">{overview}</p>
      <div className="mx-0 md:mx-2 my-2">
        <button className="bg-white text-xl py-1 md:py-4 px-4 md:px-12  text-black font-medium rounded-lg hover:opacity-80">
          ▶️Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-xl p-4 px-12 text-white bg-opacity-50 rounded-lg hover:opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
