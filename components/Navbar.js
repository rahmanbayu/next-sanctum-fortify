import axios from "axios";
import Link from "next/link";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authCheckState, authUserState } from "../store/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

function Navbar(props) {
    const setAuthCheck = useSetRecoilState(authCheckState);
    const authUser = useRecoilValueLoadable(authUserState);
    const router = useRouter();

    const logoutHandler = async () => {
        await axios.post("/logout");
        setAuthCheck("logout");
        router.push("/");
    };

    useEffect(() => {}, [authUser.contents]);

    return (
        <nav className="bg-black">
            <div className="container mx-auto flex items-center justify-between py-2">
                <div className="flex items-center">
                    <Link href="/">
                        <a className="text-gray-100 font-medium text-xl">Next Sanctum</a>
                    </Link>
                    <div className="ml-5 text-gray-50">
                        <Link href="/dashboard">Dashboard</Link>
                    </div>
                </div>
                {authUser.contents && authUser.state === "hasValue" ? (
                    <div className="text-gray-100 space-x-5 flex items-center">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button className="flex items-center focus:outline-none">
                                        <div className="flex-shrink-0 mr-3">
                                            <img src={authUser.contents.picture} alt="picture" className="rounded-full w-6 h-6" />
                                        </div>
                                        <span>{authUser.contents.name}</span>
                                    </Popover.Button>
                                    <Transition show={open} enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
                                        <Popover.Panel static className="w-56 absolute bg-white right-0 rounded-lg  text-gray-700 shadow flex flex-col overflow-hidden mt-1">
                                            <Link href={`/${authUser.contents.username}`}>
                                                <a className="py-2 px-4 hover:bg-gray-50">View Profile</a>
                                            </Link>
                                            <Link href="/settings/profile">
                                                <a className="py-2 px-4 hover:bg-gray-50">Edit Profile</a>
                                            </Link>
                                            <Link href="/settings/password">
                                                <a className="py-2 px-4 hover:bg-gray-50">Edit Password</a>
                                            </Link>
                                            <button onClick={logoutHandler} className="focus:outline-none text-left py-2 px-4 hover:bg-gray-50">
                                                Logout
                                            </button>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                ) : (
                    <div className="text-gray-100 space-x-5">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
