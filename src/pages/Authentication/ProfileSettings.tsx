// src/pages/Authentication/ProfileSettings.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Form, Label, Input, Button, FormFeedback } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    email: string
    phone: string;
    city: string;
    country: string;
    joining_date: string;
};

const fields = ['first_name', 'last_name', 'email', 'phone', 'city', 'country'] as const;
type Field = typeof fields[number];

const ProfileSettings: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [activeTab, setActiveTab] = useState<'1' | '2' | '3' | '4'>('1');

    useEffect(() => {
        (async () => {
            const { data: { session }, error: sessError } = await supabase.auth.getSession();
            if (sessError || !session?.user) {
                toast.error('Unable to load profile—please login again.');
                return;
            }
            const userId = session.user.id;
            const { data, error } = await supabase
                // .from<Profile>('profiles')
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (error) toast.error('Error fetching profile: ' + error.message);
            else setProfile(data);
        })();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name:   profile?.first_name   || '',
            last_name:    profile?.last_name    || '',
            email:        profile?.email        || '',
            phone:        profile?.phone        || '',
            city:         profile?.city         || '',
            country:      profile?.country      || '',
            joining_date: profile?.joining_date || ''
        },
        validationSchema: Yup.object({
            first_name:   Yup.string().required('Required'),
            last_name:    Yup.string().required('Required'),
            email:        Yup.string().required('Required'),
            phone:        Yup.string().required('Required'),
            city:         Yup.string().required('Required'),
            country:      Yup.string().required('Required'),
            joining_date: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user.id;
            if (!userId) {
                toast.error('Session expired. Please login again.');
                return;
            }
            const { error } = await supabase
                .from('profiles')
                .update(values)
                .eq('id', userId);
            if (error) toast.error('Update failed: ' + error.message);
            else toast.success('Profile updated!');
        },
    });

    return (
        <div className="page-content">
            <ToastContainer autoClose={2000} />
            <Container fluid>
                <Row>
                    <Col xxl={3}>
                        {/* Sidebar cards omitted for brevity */}
                    </Col>
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
                                    {/* Add other tabs here */}
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
                                                                formik.setFieldValue(
                                                                    'joining_date',
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
                                    {/* Other TabPanes (Change Password, Experience, Privacy) */}
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
