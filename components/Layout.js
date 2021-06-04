import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { authUserState } from "../store/auth";
import Navbar from "./Navbar";

function Layout({ middleware, children, title }) {
    const router = useRouter();
    const authUser = useRecoilValueLoadable(authUserState);
    const { resendEmailVerification, loading } = useVerifyEmail();

    useEffect(() => {
        if (middleware === "guest" && authUser.state === "hasValue" && authUser.contents) {
            router.replace("/dashboard");
        }
        if (middleware === "auth" && authUser.contents == null) {
            router.replace("/login");
        }
    }, [authUser.contents]);

    return (
        <div>
            <Head>
                <title>{title ?? "Next Sanctum"}</title>
            </Head>
            {authUser.contents && !authUser.contents.has_verified && authUser.state === "hasValue" && (
                <div className="bg-red-500 py-1 text-white px-10 text-sm flex items-center justify-between">
                    <span>Please verify your email!</span>
                    <button onClick={resendEmailVerification} className=" underline focus:outline-none">
                        {loading ? "Loading . . ." : "Resend Email"}
                    </button>
                </div>
            )}
            <Navbar />
            <div className="mt-10">{children}</div>
        </div>
    );
}

export default Layout;
