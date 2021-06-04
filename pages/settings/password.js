import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import Card from "../../components/Card";
import { Error, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { authUserState } from "../../store/auth";
import { useToasts } from "react-toast-notifications";

function password(props) {
    const authUser = useRecoilValueLoadable(authUserState);
    const [credentials, setCredentials] = useState({ current_password: "", password: "", password_confirmation: "" });
    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const updatePasswordHandler = async () => {
        setLoading(true);
        try {
            await axios.put("user/password", credentials);
            addToast("The password has been updated!", {
                appearance: "success",
                autoDismiss: true,
            });
            router.push("/dashboard");
        } catch (error) {
            setErrors(error.response.data.errors);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (authUser.state === "hasValue" && authUser.contents && !authUser.contents.has_verified) {
            router.replace("/settings/verify-email");
        }
    }, [authUser.contents]);

    return (
        <Layout title="Edit Password">
            <div className="w-1/2 mx-auto">
                <Card header="Edit Password">
                    <div className="mt-3">
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input value={credentials.current_password} onChange={(e) => setCredentials((prev) => ({ ...prev, current_password: e.target.value }))} type="password" name="current_password" />
                        {errors.current_password && <Error>{errors.current_password[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="password">Password</Label>
                        <Input value={credentials.password} onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))} type="password" name="password" />
                        {errors.password && <Error>{errors.password[0]}</Error>}
                    </div>
                    <div className="mt-3">
                        <Label htmlFor="password_confirmation">password_confirmation</Label>
                        <Input value={credentials.password_confirmation} onChange={(e) => setCredentials((prev) => ({ ...prev, password_confirmation: e.target.value }))} type="password" name="password_confirmation" />
                        {errors.password_confirmation && <Error>{errors.password_confirmation[0]}</Error>}
                    </div>

                    <div className="mt-3">
                        <button onClick={updatePasswordHandler} className="py-1 rounded w-full text-center bg-blue-500 hover:bg-blue-600 focus:outline-none text-white">
                            {loading ? "Loading . . ." : "Update"}
                        </button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default password;
