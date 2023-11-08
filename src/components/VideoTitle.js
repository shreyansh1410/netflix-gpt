const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white ">
            {/* <p>Video Title</p> */}
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="text-lg w-1/4 py-6">{overview}</p>
            <div className="m-2">
                <button className="bg-white text-xl p-4 px-12  text-black font-medium rounded-lg hover:opacity-80">▶️Play</button>
                <button className=" mx-2 bg-gray-500 text-xl p-4 px-12 text-white bg-opacity-50 rounded-lg hover:opacity-80">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle
