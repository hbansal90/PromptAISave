import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Loading...</h1>
      <div className="relative w-32 h-32">
        <Image
          src="/assets/icons/loader.svg"
          layout="fill"
          alt="loader"
          className="animate-spin"
        />
      </div>
    </div>
  );
};

export default Loading;