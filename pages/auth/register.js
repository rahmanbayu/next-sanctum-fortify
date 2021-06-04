import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { authCheckState } from "../../store/auth";
import { useRouter } from "next/router";

function register(props) {
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "", password_confirmation: "" });
    const setAuth = useSetRecoilState(authCheckState);
    const route = useRouter();
    const registerHandler = async () => {
        try {
            await axios.post("/register", credentials);
            setAuth(credentials);
            route.push("/dashboard");
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };
    return (
        <Layout middleware="guest" title="Register">
            <div className="w-1/2 mx-auto">
                <Card header="Register">
                    <div className="mt-3">
                        <Label htmlFor="name">Name</Label>
                        <Input value={credentials.name} onChange={(e) => setCredentials((prev) => ({ ...prev, name: e.target.value }))} type="text" name="name" />
                        {errors.name && <Error>{errors.name[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="username">Username</Label>
                        <Input value={credentials.username} onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))} type="text" name="username" />
                        {errors.username && <Error>{errors.username[0]}</Error>}
                    </div>
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
                    <div className="mt-3">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input value={credentials.password_confirmation} onChange={(e) => setCredentials((prev) => ({ ...prev, password_confirmation: e.target.value }))} type="password" name="password_confirmation" />
                    </div>
                    <div className="mt-3">
                        <button onClick={registerHandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            Next
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default register;
