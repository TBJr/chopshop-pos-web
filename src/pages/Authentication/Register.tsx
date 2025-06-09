// src/pages/Authentication/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
    Button,
    Spinner,
    Alert
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { supabase } from "../../lib/supabaseClient";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            first_name: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Please enter your email"),
            first_name: Yup.string().required("Please enter your username"),
            password: Yup.string().min(6, "At least 6 characters").required("Please enter your password"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords do not match")
                .required("Please confirm your password")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: { data: { first_name: values.first_name } }
            });
            setLoading(false);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Registration successful! Check your email to confirm.");
                setTimeout(() => navigate("/login"), 2000);
            }
        }
    });

    return (
        <ParticlesAuth>
            <div className="auth-page-content">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} xl={5}>
                            <Card className="mt-4">
                                <CardBody className="p-4">
                                    <div className="text-center mb-4">
                                        <Link to="/" className="d-inline-block auth-logo mb-3">
                                            <img src={logoLight} alt="logo" height="30" />
                                        </Link>
                                        <h5 className="text-primary">Create New Account</h5>
                                        <p className="text-muted">Get your free Evolvtech account now</p>
                                    </div>

                                    <Form onSubmit={formik.handleSubmit} noValidate>
                                        <ToastContainer autoClose={2000} />

                                        <div className="mb-3">
                                            <Label htmlFor="email">Email <span className="text-danger">*</span></Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                invalid={!!(formik.touched.email && formik.errors.email)}
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <FormFeedback>{formik.errors.email}</FormFeedback>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <Label htmlFor="first_name">Username <span className="text-danger">*</span></Label>
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                placeholder="Enter username"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.first_name}
                                                invalid={!!(formik.touched.first_name && formik.errors.first_name)}
                                            />
                                            {formik.touched.first_name && formik.errors.first_name && (
                                                <FormFeedback>{formik.errors.first_name}</FormFeedback>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <Label htmlFor="password">Password <span className="text-danger">*</span></Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                invalid={!!(formik.touched.password && formik.errors.password)}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <FormFeedback>{formik.errors.password}</FormFeedback>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <Label htmlFor="confirm_password">Confirm Password <span className="text-danger">*</span></Label>
                                            <Input
                                                id="confirm_password"
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.confirm_password}
                                                invalid={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                                            />
                                            {formik.touched.confirm_password && formik.errors.confirm_password && (
                                                <FormFeedback>{formik.errors.confirm_password}</FormFeedback>
                                            )}
                                        </div>

                                        <div className="d-grid">
                                            <Button color="success" type="submit" disabled={loading}>
                                                {loading ? <Spinner size="sm" className="me-2" /> : "Sign Up"}
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="mt-4 text-center">
                                        <p className="mb-0">
                                            Already have an account?{" "}
                                            <Link to="/login" className="fw-semibold text-primary">
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default Register;