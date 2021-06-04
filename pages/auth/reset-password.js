import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

function resetpassword(props) {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ token: "", email: "", password: "", password_confirmation: "" });
    const [errors, setErrors] = useState([]);
    const { addToast } = useToasts();

    const resetPasswordhandler = async () => {
        try {
            let response = await axios.post("/reset-password", credentials);
            addToast(response.data.message, {
                appearance: "success",
                autoDismiss: true,
            });
            router.replace("/login");
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    useEffect(() => {
        setCredentials((prev) => ({ ...prev, token: router.query.token }));
    }, [router.query.token]);

    return (
        <Layout middleware="guest" title="Reset Password">
            <div className="w-1/2 mx-auto">
                <Card header="Reset Password">
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
                        {errors.password_confirmation && <Error>{errors.password_confirmation[0]}</Error>}
                    </div>

                    <div className="mt-3">
                        <button onClick={resetPasswordhandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            Next
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default resetpassword;
