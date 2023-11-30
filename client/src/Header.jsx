import {useContext} from "react";
import {UserContext} from "./UserContext";
import {Link} from "react-router-dom";

export default function Header() {
    const {user} = useContext(UserContext);

    return (
        <header
            className="flex bg-white gap-1 md:flex-row sm:flex-row lg:flex-row flex-row items-center justify-between">
            <div className="flex justify-center ">
                <Link to={"/"} className="flex items-center text-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="30"
                         viewBox="0 0 50 50">
                        <path
                            d="M 25 3 C 22.089763 3 19.426171 4.6219485 18.101562 7.2109375 C 18.101562 7.2109375 18.101562 7.2128906 18.101562 7.2128906 C 18.100721 7.2145406 18.098456 7.2151469 18.097656 7.2167969 C 14.362181 14.470691 11.153754 20.806968 8.8125 25.537109 C 7.6414743 27.902985 6.687023 29.865615 5.9882812 31.351562 C 5.2895395 32.837511 4.8852246 33.690051 4.6484375 34.445312 L 4.6464844 34.451172 L 4.6445312 34.455078 C 4.3882597 35.286653 4.0507813 36.398902 4.0507812 37.710938 C 4.050775 42.817736 8.2464268 47 13.359375 47 C 19.155308 47 23.13514 42.379741 25 40.246094 C 26.863773 42.378622 30.84408 47 36.640625 47 C 41.753573 47 45.949219 42.817041 45.949219 37.710938 C 45.949219 36.400725 45.611269 35.290244 45.357422 34.462891 L 45.355469 34.457031 L 45.353516 34.451172 C 45.116766 33.696932 44.710766 32.842025 44.011719 31.355469 C 43.312672 29.868912 42.358775 27.905437 41.1875 25.539062 C 38.845946 20.808326 35.636451 14.471917 31.900391 7.2167969 L 31.896484 7.2089844 C 30.573258 4.6215238 27.909692 3 25 3 z M 25 7 C 26.501366 7 27.663733 7.7112326 28.337891 9.0332031 L 28.339844 9.0371094 L 28.341797 9.0410156 C 32.072698 16.286027 35.273612 22.609248 37.601562 27.3125 C 38.765538 29.664126 39.712688 31.612775 40.392578 33.058594 C 41.070992 34.501273 41.51864 35.591444 41.535156 35.642578 C 41.766356 36.396981 41.949219 37.142801 41.949219 37.710938 C 41.949219 40.640833 39.589677 43 36.640625 43 C 33.058397 43 29.288603 39.125076 27.574219 37.181641 L 27.570312 37.177734 L 27.564453 37.171875 C 29.414381 34.870802 32.5 30.815064 32.5 26.285156 C 32.5 22.24174 29.075312 19 25 19 C 20.924688 19 17.5 22.24174 17.5 26.285156 C 17.5 30.821724 20.585713 34.874909 22.433594 37.171875 L 22.429688 37.175781 L 22.425781 37.181641 C 20.71032 39.126116 16.941603 43 13.359375 43 C 10.410323 43 8.0507812 40.642105 8.0507812 37.710938 C 8.0507812 37.139669 8.2326858 36.397306 8.4648438 35.642578 C 8.4785567 35.598838 8.9298042 34.499865 9.609375 33.054688 C 10.288946 31.60951 11.234712 29.661671 12.398438 27.310547 C 14.725886 22.608298 17.926351 16.285977 21.65625 9.0429688 L 21.658203 9.0390625 L 21.660156 9.0371094 C 22.336573 7.7118248 23.498634 7 25 7 z M 25 23 C 26.990688 23 28.5 24.498572 28.5 26.285156 C 28.5 28.42415 26.577097 31.630372 24.998047 33.798828 C 23.4206 31.634253 21.5 28.434819 21.5 26.285156 C 21.5 24.498572 23.009312 23 25 23 z"></path>
                    </svg>

                    <span className="font-bold text-xl custom-hidden">Table Trove</span>
                </Link>
            </div>
            <div
                className="flex border border-gray-300 rounded-full py-1 shadow shadow-gray-500 items-center shadow-grey-300 ">
                <div className="flex px-4 gap-2 rounded-full">
                    <div className="flex items-center border border-gray-500 rounded-full p-1 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <div className="px-2 font-semibold custom-hidden_2">Anywhere</div>
                    </div>

                    <div className="flex items-center border border-gray-500 rounded-full px-2 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <div className="px-2 font-semibold custom-hidden_2">Any week</div>
                    </div>

                    <div className="flex items-center border border-gray-500 rounded-full px-2">
                        <div className="border-l border-gray-400 rounded-full text-center"></div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"/>
                        </svg>

                        <div className="p-1 font-semibold custom-hidden_2">Add guests</div>


                    </div>

                    <button className="bg-primary text-white px-2 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <Link
                to={user ? "/account" : "/login"}
                className="flex border border-gray-300 rounded-full py-2 px-2 shadow-md items-center shadow-grey-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 ml-2 custom-hidden"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                    />
                </svg>

                <div className="bg-gray-500 text-white rounded-full border-grey-500 flex items-center"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                    />
                </svg>

                {!!user && (
                    <div className="ml-1 mr-1 custom-hidden font-bold">
                        {user.first} {user.last}
                    </div>
                )}
            </Link>
        </header>
    );
}
