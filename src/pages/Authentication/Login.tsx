// src/pages/Authentication/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
    Button,
    Spinner
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { supabase } from "../../lib/supabaseClient";

type Provider = "google" | "github" | "facebook" | "twitter";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Please enter your email"),
            password: Yup.string().required("Please enter your password")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password
            });
            setLoading(false);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Login successful!");
                navigate("/dashboard");
            }
        }
    });

    const handleSocialLogin = async (provider: Provider) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({ provider });
        setLoading(false);
        if (error) toast.error(error.message);
        // On success you'll be redirected to the provider's flow
    };

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
                                        <h5 className="text-primary">Welcome Back!</h5>
                                        <p className="text-muted">Sign in to continue to Evolvtech.</p>
                                    </div>

                                    <Form onSubmit={formik.handleSubmit} noValidate>
                                        <ToastContainer autoClose={2000} />

                                        <div className="mb-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email"
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
                                            <div className="float-end">
                                                <Link to="/forgot-password" className="text-muted">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <Label htmlFor="password">Password</Label>
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

                                        <div className="form-check mb-4">
                                            <Input
                                                id="remember"
                                                className="form-check-input"
                                                type="checkbox"
                                            />
                                            <Label className="form-check-label" htmlFor="remember">
                                                Remember me
                                            </Label>
                                        </div>

                                        <div className="d-grid mb-3">
                                            <Button color="success" type="submit" disabled={loading}>
                                                {loading ? <Spinner size="sm" className="me-2" /> : "Sign In"}
                                            </Button>
                                        </div>

                                        <div className="text-center mb-3">
                                            <p className="mb-2">Or sign in with</p>
                                            <Button
                                                color="primary"
                                                className="btn-icon me-1"
                                                onClick={() => handleSocialLogin("google")}
                                                disabled={loading}
                                            >
                                                <i className="ri-google-fill fs-16" />
                                            </Button>
                                            <Button
                                                color="dark"
                                                className="btn-icon me-1"
                                                onClick={() => handleSocialLogin("github")}
                                                disabled={loading}
                                            >
                                                <i className="ri-github-fill fs-16" />
                                            </Button>
                                            <Button
                                                color="info"
                                                className="btn-icon me-1"
                                                onClick={() => handleSocialLogin("facebook")}
                                                disabled={loading}
                                            >
                                                <i className="ri-facebook-fill fs-16" />
                                            </Button>
                                            <Button
                                                color="secondary"
                                                className="btn-icon"
                                                onClick={() => handleSocialLogin("twitter")}
                                                disabled={loading}
                                            >
                                                <i className="ri-twitter-fill fs-16" />
                                            </Button>
                                        </div>

                                        <div className="text-center">
                                            <p className="mb-0">
                                                Don’t have an account?{" "}
                                                <Link to="/register" className="fw-semibold text-primary">
                                                    Signup
                                                </Link>
                                            </p>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default Login;