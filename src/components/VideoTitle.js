const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video py-36 px-16 absolute z-40 saturate-150 text-white ">
            {/* <p>Video Title</p> */}
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="text-lg w-1/4 py-6">{overview}</p>
            <div className="m-2">
                <button className="bg-blue-500 text-xl p-4 px-12  text-white bg-opacity-50 rounded-lg">▶️Play</button>
                <button className=" mx-2 bg-blue-500 text-xl p-4 px-12 text-white bg-opacity-50 rounded-lg">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle
