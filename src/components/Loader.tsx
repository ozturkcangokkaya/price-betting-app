import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-75">
      <ScaleLoader aria-label="Loading..." width={5} height={80} />
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold text-gray-800">Loading...</h3>
      </div>
    </div>
  );
};

export default Loader;
