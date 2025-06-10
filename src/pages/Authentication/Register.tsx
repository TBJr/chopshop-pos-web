// src/pages/Authentication/Register.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, CardBody, Container, Input, Label, Form, FormFeedback, Button, Spinner } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import logoIcon from '../../assets/images/logo-icon.png'
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'
import { supabase } from '../../lib/supabaseClient'

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', first_name: '', password: '', confirm_password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            first_name: Yup.string().required('Required'),
            password: Yup.string().min(6, 'Min 6 chars').required('Required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: { data: { first_name: values.first_name } }
            });
            setLoading(false);
            if (error) return toast.error(error.message);
            toast.success('Registration successful!');
            navigate('/login');
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
                                        <Link to="/" className="auth-logo mb-3 d-inline-block">
                                            <img src={logoIcon} alt="logo" height="50" />
                                        </Link>
                                        <h5 className="text-primary">Create New Account</h5>
                                        <p className="text-muted">Get your free Evolvtech account now</p>
                                    </div>

                                    <Form onSubmit={formik.handleSubmit} noValidate>
                                        <ToastContainer autoClose={2000} />

                                        <div className="mb-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter email"
                                                {...formik.getFieldProps('email')}
                                                invalid={!!(formik.touched.email && formik.errors.email)}
                                            />
                                            <FormFeedback>{formik.errors.email}</FormFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <Label htmlFor="first_name">Username</Label>
                                            <Input
                                                id="first_name"
                                                type="text"
                                                placeholder="Enter username"
                                                {...formik.getFieldProps('first_name')}
                                                invalid={!!(formik.touched.first_name && formik.errors.first_name)}
                                            />
                                            <FormFeedback>{formik.errors.first_name}</FormFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Enter password"
                                                {...formik.getFieldProps('password')}
                                                invalid={!!(formik.touched.password && formik.errors.password)}
                                            />
                                            <FormFeedback>{formik.errors.password}</FormFeedback>
                                        </div>

                                        <div className="mb-4">
                                            <Label htmlFor="confirm_password">Confirm Password</Label>
                                            <Input
                                                id="confirm_password"
                                                type="password"
                                                placeholder="Confirm password"
                                                {...formik.getFieldProps('confirm_password')}
                                                invalid={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                                            />
                                            <FormFeedback>{formik.errors.confirm_password}</FormFeedback>
                                        </div>

                                        <div className="d-grid">
                                            <Button color="success" type="submit" disabled={loading}>
                                                {loading ? <Spinner size="sm" className="me-2" /> : 'Sign Up'}
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="text-center mt-3">
                                        <p className="mb-0">
                                            Already have an account?{' '}
                                            <Link to="/login" className="fw-semibold text-primary">Sign In</Link>
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