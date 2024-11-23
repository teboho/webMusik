import React, { useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Input } from 'antd';
import { AuthContext } from '../providers/authProvider/contexts';
import { initializeApp, getApps, getApp } from 'firebase/app';

const FIREBASE_CONFIGURATION = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(FIREBASE_CONFIGURATION) : getApp(); 

const Login = ({
  setModalOpen,
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { setAuthorised } = useContext(AuthContext);

    const handleSubmit = async (e) => {
      setLoading(true);
      
      const email = form.getFieldValue('email');
      const password = form.getFieldValue('password');
      console.log(email, password);
      const auth = getAuth(app);
      
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('user', user);
          // ...
          setAuthorised(true);
          setLoading(false);
          localStorage.setItem("authorised", true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setAuthorised(false);
          localStorage.setItem("authorised", false);
        });
    }

    return (
      <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        email: '',
        password: '',
      }}
      >
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

      <Form.Item
        name="password"
        label="Password"
        rules={[
        { required: true, message: 'Please enter your password' },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
        Submit
        </Button>
      </Form.Item>
      </Form>
    );
}

export default Login;