

const Home = () => {

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex justif
                    y-between items-center">
                        <div className="text-lg font-semibold">Vex</div>
                    </div>
                </div>
            </nav>

            {/* axiosでスクレイピングした情報を出力 */}
            <div className="container mx-auto my-10 px-6">
                <p className="text-gray-700 font-medium">スクレイピング</p>
                <p className="mt-3 text-sm text-gray-500">イベント名</p>
                <p className="mt-3 text-sm text-gray-500">住所</p>
            </div>

            {/* Google Map APIを使って地図を表示 */}
            <div className="container mx-auto my-10 px-6">
                <p className="text-gray-700 font-medium">地図</p>
                <div className="mt-3 text-sm text-gray-500">地図を表示</div>
            </div>


        </div >
    );
};
export default Home;