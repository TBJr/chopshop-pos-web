// src/pages/ProfileSettings.tsx
import React, { useState } from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane, Form, Label, Input, FormFeedback, Button } from 'reactstrap'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css'

import profileBg from '../../assets/images/profile-bg.jpg'
import avatarImg from '../../assets/images/users/avatar-1.jpg'
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'

type TabKey = 'personal' | 'security' | 'experience' | 'privacy';

const ProfileSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('personal');

    // Formik setup for personal details
    const personalForm = useFormik({
        initialValues: {
            firstName: 'Anna',
            lastName: 'Adame',
            phone: '+1 987 6543',
            email: 'anna.adame@example.com',
            joiningDate: new Date(),
            skills: [],
            designation: 'Lead Designer / Developer',
            website: 'www.velzon.com',
            city: 'California',
            country: 'United States',
            zip: '90011',
            description: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required')
        }),
        onSubmit: (values) => {
            console.log('Personal Details submitted', values);
        }
    });

    // Formik setup for password change
    const passwordForm = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Required'),
            newPassword: Yup.string().min(6, 'Min 6 chars').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: (values) => {
            console.log('Password change', values);
        }
    });

    return (
        <ParticlesAuth>
            <div className="page-content">
                <Container fluid>
                    {/* Cover Image & Edit */}
                    <div className="profile-header mb-4" style={{ position: 'relative' }}>
                        <img src={profileBg} alt="Cover" className="img-fluid w-100" />
                        <div style={{ position: 'absolute', top: 16, right: 16 }}>
                            <Input type="file" id="cover-upload" hidden />
                            <Label for="cover-upload" className="btn btn-light">
                                Change Cover
                            </Label>
                        </div>
                    </div>

                    <Row>
                        <Col xl={3}>
                            {/* Avatar & Progress */}
                            <Card className="mb-4">
                                <CardBody className="text-center">
                                    <div className="mb-3 position-relative d-inline-block">
                                        <img
                                            src={avatarImg}
                                            alt="Avatar"
                                            className="rounded-circle img-thumbnail"
                                            style={{ width: 100, height: 100 }}
                                        />
                                        <Input type="file" id="avatar-upload" hidden />
                                        <Label for="avatar-upload" className="position-absolute" style={{ bottom: 0, right: 0 }}>
                                            <i className="ri-camera-fill fs-4"></i>
                                        </Label>
                                    </div>
                                    <h5>{personalForm.values.firstName} {personalForm.values.lastName}</h5>
                                    <p className="text-muted">{personalForm.values.designation}</p>
                                </CardBody>
                            </Card>

                            {/* Profile Completion */}
                            <Card className="mb-4">
                                <CardBody>
                                    <h5>Complete Your Profile</h5>
                                    <div className="progress mb-1">
                                        <div className="progress-bar bg-danger" style={{ width: '30%' }}>30%</div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={9}>
                            <Card>
                                <CardHeader>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classNames({ active: activeTab === 'personal' })}
                                                onClick={() => setActiveTab('personal')}
                                            >
                                                Personal Details
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classNames({ active: activeTab === 'security' })}
                                                onClick={() => setActiveTab('security')}
                                            >
                                                Change Password
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classNames({ active: activeTab === 'experience' })}
                                                onClick={() => setActiveTab('experience')}
                                            >
                                                Experience
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classNames({ active: activeTab === 'privacy' })}
                                                onClick={() => setActiveTab('privacy')}
                                            >
                                                Privacy Policy
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="personal">
                                            <Form onSubmit={personalForm.handleSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label for="firstName">First Name</Label>
                                                        <Input
                                                            id="firstName"
                                                            {...personalForm.getFieldProps('firstName')}
                                                            invalid={!!(personalForm.touched.firstName && personalForm.errors.firstName)}
                                                        />
                                                        <FormFeedback>{personalForm.errors.firstName}</FormFeedback>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label for="lastName">Last Name</Label>
                                                        <Input
                                                            id="lastName"
                                                            {...personalForm.getFieldProps('lastName')}
                                                            invalid={!!(personalForm.touched.lastName && personalForm.errors.lastName)}
                                                        />
                                                        <FormFeedback>{personalForm.errors.lastName}</FormFeedback>
                                                    </Col>
                                                    {/* Additional fields here, using Formik */}
                                                    <Col md={12} className="mt-3">
                                                        <Button color="primary" type="submit">Save Changes</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="security">
                                            <Form onSubmit={passwordForm.handleSubmit}>
                                                <Row>
                                                    <Col md={4}>
                                                        <Label for="oldPassword">Old Password</Label>
                                                        <Input
                                                            type="password"
                                                            id="oldPassword"
                                                            {...passwordForm.getFieldProps('oldPassword')}
                                                            invalid={!!(passwordForm.touched.oldPassword && passwordForm.errors.oldPassword)}
                                                        />
                                                        <FormFeedback>{passwordForm.errors.oldPassword}</FormFeedback>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Label for="newPassword">New Password</Label>
                                                        <Input
                                                            type="password"
                                                            id="newPassword"
                                                            {...passwordForm.getFieldProps('newPassword')}
                                                            invalid={!!(passwordForm.touched.newPassword && passwordForm.errors.newPassword)}
                                                        />
                                                        <FormFeedback>{passwordForm.errors.newPassword}</FormFeedback>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Label for="confirmPassword">Confirm Password</Label>
                                                        <Input
                                                            type="password"
                                                            id="confirmPassword"
                                                            {...passwordForm.getFieldProps('confirmPassword')}
                                                            invalid={!!(passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword)}
                                                        />
                                                        <FormFeedback>{passwordForm.errors.confirmPassword}</FormFeedback>
                                                    </Col>
                                                    <Col md={12} className="mt-3">
                                                        <Button color="primary" type="submit">Change Password</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="experience">
                                            {/* Experience content to be implemented */}
                                            <p>Experience section coming soon.</p>
                                        </TabPane>

                                        <TabPane tabId="privacy">
                                            {/* Privacy content to be implemented */}
                                            <p>Privacy policy content coming soon.</p>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default ProfileSettings;