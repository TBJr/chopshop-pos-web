// src/pages/Authentication/UpdatePassword.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
    Container, Row, Col, Card, CardBody,
    Form, Label, Input, FormFeedback,
    Button, Spinner
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';
import { supabase } from '../../lib/supabaseClient';

const UpdatePassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [validLink, setValidLink] = useState(false);

    useEffect(() => {
        const type = searchParams.get('type');
        const token = searchParams.get('token');
        if (type === 'recovery' && token) {
            supabase.auth.verifyOtp({ type: 'recovery', token })
                .then(({ error }) => {
                    if (error) {
                        toast.error('Invalid or expired reset link.');
                    } else {
                        setValidLink(true);
                    }
                });
        } else {
            toast.error('Invalid reset link.');
        }
    }, [searchParams]);

    const formik = useFormik({
        initialValues: { password: '', confirm_password: '' },
        validationSchema: Yup.object({
            password: Yup.string().min(6, 'Min 6 chars').required('Required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async ({ password }) => {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({ password });
            setLoading(false);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Password updated! Redirecting to login...');
                setTimeout(() => navigate('/login', { replace: true }), 1500);
            }
        }
    });

    if (!validLink) {
        return (
            <ParticlesAuth>
                <Container className="vh-100 d-flex align-items-center justify-content-center">
                    <Card>
                        <CardBody className="text-center p-4">
                            <p>Invalid or expired link.</p>
                            <Link to="/forgot-password">Request a new reset link</Link>
                        </CardBody>
                    </Card>
                </Container>
            </ParticlesAuth>
        );
    }

    return (
        <ParticlesAuth>
            <div className="auth-page-content">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} xl={5}>
                            <Card className="mt-4">
                                <CardBody className="p-4">
                                    <div className="text-center mb-4">
                                        <h5 className="text-primary">Reset Your Password</h5>
                                        <p className="text-muted">Enter a new password below</p>
                                    </div>

                                    <Form onSubmit={formik.handleSubmit} noValidate>
                                        <ToastContainer autoClose={2000} />

                                        <div className="mb-3">
                                            <Label htmlFor="password">New Password</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter new password"
                                                {...formik.getFieldProps('password')}
                                                invalid={!!(formik.touched.password && formik.errors.password)}
                                            />
                                            <FormFeedback>{formik.errors.password}</FormFeedback>
                                        </div>

                                        <div className="mb-4">
                                            <Label htmlFor="confirm_password">Confirm Password</Label>
                                            <Input
                                                id="confirm_password"
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm password"
                                                {...formik.getFieldProps('confirm_password')}
                                                invalid={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                                            />
                                            <FormFeedback>{formik.errors.confirm_password}</FormFeedback>
                                        </div>

                                        <div className="d-grid">
                                            <Button color="success" type="submit" disabled={loading}>
                                                {loading ? <Spinner size="sm" className="me-2" /> : 'Update Password'}
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="text-center mt-3">
                                        <Link to="/login" className="text-muted">Back to Sign In</Link>
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

export default UpdatePassword;