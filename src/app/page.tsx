import Circles3D from '@/components/TestSvg';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <button className="py-6 px-20 bg-white border border-white rounded-full text-black">
                <h1>zonaprop</h1>
            </button>
            <Circles3D />
        </div>
    );
}
