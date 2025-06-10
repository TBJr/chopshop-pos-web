import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, Form, Label, Input, FormFeedback, Button, Spinner } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'
import { supabase } from '../../lib/supabaseClient'

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required')
        }),
        onSubmit: async ({ email }) => {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`
            });
            setLoading(false);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Check your inbox for reset instructions.');
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
                                        <h5 className="text-primary">Forgot Password</h5>
                                        <p className="text-muted">Enter your email to reset password</p>
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

                                        <div className="d-grid">
                                            <Button color="primary" type="submit" disabled={loading}>
                                                {loading ? <Spinner size="sm" className="me-2" /> : 'Send Reset Link'}
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

export default ForgotPassword;