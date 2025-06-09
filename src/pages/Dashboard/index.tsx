// src/pages/Dashboard/index.tsx
import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {Container} from "reactstrap";

const Dashboard: React.FC = () => {
    document.title = "Dashboard | Evolvtech - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ecommerce" pageTitle="Dashboard" />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
