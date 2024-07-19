import Image from "next/image";

const Loading = () => {
    return (
        <div className="flex-grow flex justify-center items-center min-h-screen">
            <div className="text-center">
                <Image
                    src='/assets/icons/loader.svg' 
                    width={50}
                    height={50}
                    alt='loader'
                    className='object-contain'
                />
            </div>
        </div>
    );
};

export default Loading;
