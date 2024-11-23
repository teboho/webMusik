import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Form, Input, Button, message } from 'antd';

const FIREBASE_CONFIGURATION = {
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIGURATION);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const SignUp = ({
  setModalOpen,
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (e) => {
      setLoading(true);
      try {
        await setDoc(doc(db, "signups", form.getFieldValue('email')), {
          name:  form.getFieldValue('firstName'),
          email: form.getFieldValue('email'),
        });
      } catch (error) {
        // console.error('Submission error:', error);
        message.error('There was an error submitting your request. Please try again later.');
      } finally {
        setLoading(false);
        setModalOpen(false);
        form.resetFields();
        message.success('Request submitted successfully. We will be in touch soon.');
      }
    }

    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          firstName: '',
          email: '',
        }}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            { required: true, message: 'Please enter your first name' },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}

export default SignUp;
