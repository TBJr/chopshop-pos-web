// src/pages/Authentication/ProfileSettings.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
    Container, Row, Col, Card, CardHeader, CardBody,
    Nav, NavItem, NavLink, TabContent, TabPane,
    Form, Label, Input, Button, FormFeedback
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// assets
import profileBg from '../../assets/images/profile-bg.jpg';
import avatar1 from '../../assets/images/users/avatar-1.jpg';

type ProfileMeta = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone: string;
    city: string;
    country: string;
    joining_date: string;
};

const fields = ['first_name', 'last_name', 'email', 'username', 'phone', 'city', 'country'] as const;
type Field = typeof fields[number];

const ProfileSettings: React.FC = () => {
    const [meta, setMeta] = useState<ProfileMeta | null>(null);
    const [activeTab, setActiveTab] = useState<'1' | '2' | '3' | '4'>('1');

    useEffect(() => {
        (async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                toast.error('Unable to load profile—please log in again.');
                return;
            }
            // pull metadata stored on the user
            const m = (user.user_metadata || {}) as Partial<ProfileMeta>;
            setMeta({
                first_name:   m.first_name   || '',
                last_name:    m.last_name    || '',
                email:        m.email        || '',
                username:     m.username     || '',
                phone:        m.phone        || '',
                city:         m.city         || '',
                country:      m.country      || '',
                joining_date: m.joining_date || ''
            });
        })();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name:   meta?.first_name   || '',
            last_name:    meta?.last_name    || '',
            email:        meta?.email        || '',
            username:     meta?.username     || '',
            phone:        meta?.phone        || '',
            city:         meta?.city         || '',
            country:      meta?.country      || '',
            joining_date: meta?.joining_date || ''
        },
        validationSchema: Yup.object({
            first_name:   Yup.string().required('Required'),
            last_name:    Yup.string().required('Required'),
            email:        Yup.string().email('Invalid email').required('Required'),
            username:     Yup.string().required('Required'),
            phone:        Yup.string().required('Required'),
            city:         Yup.string().required('Required'),
            country:      Yup.string().required('Required'),
            joining_date: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            const { error } = await supabase.auth.updateUser({ data: values });
            if (error) toast.error('Update failed: ' + error.message);
            else toast.success('Profile updated!');
        },
    });

    return (
        <div className="page-content">
            <ToastContainer autoClose={2000} />
            <Container fluid>
                {/* Cover */}
                <div className="position-relative mx-n4 mt-n4">
                    <div className="profile-wid-bg profile-setting-img">
                        <img src={profileBg} className="profile-wid-img" alt="cover" />
                        <div className="overlay-content">
                            <div className="text-end p-3">
                                <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                                    <Input id="profile-foreground-img-file-input" type="file" className="d-none" />
                                    <Label htmlFor="profile-foreground-img-file-input" className="btn btn-light">
                                        <i className="ri-image-edit-line align-bottom me-1"></i> Change Cover
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Row>
                    {/* Sidebar */}
                    <Col xxl={3}>
                        <Card className="mt-n5">
                            <CardBody className="p-4 text-center">
                                <div className="profile-user position-relative d-inline-block mb-3">
                                    <img src={avatar1}
                                         className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                         alt="user-profile" />
                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <Input id="profile-img-file-input" type="file" className="d-none" />
                                        <Label htmlFor="profile-img-file-input" className="avatar-title rounded-circle bg-light text-body">
                                            <i className="ri-camera-fill"></i>
                                        </Label>
                                    </div>
                                </div>
                                <h5 className="fs-16 mb-1">{meta?.first_name} {meta?.last_name}</h5>
                                <p className="text-muted mb-0">{meta?.username}</p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className="d-flex align-items-center mb-4">
                                    <h5 className="card-title mb-0 flex-grow-1">Complete Your Profile</h5>
                                    <Link to="#" className="badge bg-light text-primary fs-12">
                                        <i className="ri-edit-box-line align-bottom me-1"></i> Edit
                                    </Link>
                                </div>
                                <div className="progress animated-progress custom-progress progress-label">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: '30%' }}>
                                        <div className="label">30%</div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className="d-flex align-items-center mb-3">
                                    <h5 className="card-title mb-0 flex-grow-1">Portfolio</h5>
                                    <Link to="#" className="badge bg-light text-primary fs-12">
                                        <i className="ri-add-fill align-bottom me-1"></i> Add
                                    </Link>
                                </div>
                                {/* Portfolio inputs omitted for brevity */}
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Main Content */}
                    <Col xxl={9}>
                        <Card className="mt-xxl-n5">
                            <CardHeader>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => setActiveTab('1')}
                                        >
                                            Personal Details
                                        </NavLink>
                                    </NavItem>
                                    {/* other tabs */}
                                </Nav>
                            </CardHeader>
                            <CardBody>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <Row>
                                                {fields.map((field) => (
                                                    <Col lg={6} key={field}>
                                                        <div className="mb-3">
                                                            <Label htmlFor={field}>
                                                                {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </Label>
                                                            <Input
                                                                id={field}
                                                                {...formik.getFieldProps(field)}
                                                                invalid={!!(formik.touched[field] && formik.errors[field])}
                                                            />
                                                            <FormFeedback>{formik.errors[field]}</FormFeedback>
                                                        </div>
                                                    </Col>
                                                ))}
                                                <Col lg={12}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="joining_date">Joining Date</Label>
                                                        <Flatpickr
                                                            id="joining_date"
                                                            className="form-control"
                                                            options={{ dateFormat: 'Y-m-d' }}
                                                            value={formik.values.joining_date}
                                                            onChange={([date]) =>
                                                                formik.setFieldValue('joining_date',
                                                                    (date as Date).toISOString().split('T')[0]
                                                                )
                                                            }
                                                        />
                                                        {formik.touched.joining_date && formik.errors.joining_date && (
                                                            <div className="invalid-feedback d-block">
                                                                {formik.errors.joining_date}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <Button color="primary">Save Changes</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </TabPane>
                                    {/* other TabPanes */}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileSettings;