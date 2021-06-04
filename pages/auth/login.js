import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { authCheckState } from "../../store/auth";
import { useRouter } from "next/router";
import Link from "next/link";

function register(props) {
    const setAuth = useSetRecoilState(authCheckState);
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState({ email: "", password: "", remember: "" });
    const router = useRouter();
    const loginHandler = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", credentials);
            setAuth(credentials);
            router.push("/dashboard");
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };
    return (
        <Layout middleware="guest" title="Login">
            <div className="w-1/2 mx-auto">
                <Card header="Login">
                    <div className="mt-3">
                        <Label htmlFor="email">Email</Label>
                        <Input value={credentials.email} onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))} type="text" name="email" />
                        {errors.email && <Error>{errors.email[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="password">Password</Label>
                        <Input value={credentials.password} onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))} type="password" name="password" />
                        {errors.password && <Error>{errors.password[0]}</Error>}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <input value={credentials.remember} onChange={(e) => setCredentials((prev) => ({ ...prev, remember: e.target.value }))} type="checkbox" name="remember" id="remember" className="border border-gray-100 focus:ring-2 ring-blue-400 ring-opacity-30 rounded" />
                            <label htmlFor="remember" className=" ml-2">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <Link href="/forgot-password">
                                <a className="text-blue-500 text-sm">Forgot password</a>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button onClick={loginHandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            Next
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default register;
