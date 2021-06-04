import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";

function dashboard(props) {
    return (
        <Layout middleware="auth" title="Dashboard">
            <Container>Dashboard</Container>
        </Layout>
    );
}

export default dashboard;
