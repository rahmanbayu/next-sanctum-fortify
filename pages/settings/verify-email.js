import axios from "axios";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import useVerifyEmail from "../../hooks/useVerifyEmail";

function verifyemail(props) {
    const { resendEmailVerification, loading } = useVerifyEmail();
    return (
        <Layout middleware="auth" title="Verify Email">
            <Container>
                <h4 className="text-2xl font-medium text-center mb-4">Verify Your Email</h4>
                <p className="text-center max-w-md mx-auto mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore saepe inventore magni magnam ut repellendus!</p>
                <button onClick={resendEmailVerification} className="bg-blue-500 rounded text-white focus:outline-none py-1 px-5 mx-auto block">
                    {loading ? "Loading . . ." : "Resend Email"}
                </button>
            </Container>
        </Layout>
    );
}

export default verifyemail;
