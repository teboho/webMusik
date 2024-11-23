import { Button, Table } from "antd";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import withUserManagement from "../hocs/withUserManagement";
import { act } from "react";

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const mycollection = "signups";

// show antd table with the data
const SignUps = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('data', data);
    // read all documents from the collection
    try {

      getDocs(collection(db, mycollection)).then((querySnapshot) => {
      console.log('querySnapshot', querySnapshot);
      const items = [];
      querySnapshot.forEach((doc) => {
        console.log('--', doc.data());
        items.push({
          key: doc.id,
          ...doc.data(),
          actions: (
            <>
              <Button type="primary">Approve</Button>
              <Button type="danger">Reject</Button>
              <Button type="link">Revoke</Button>
            </>
          )
        });
      });
      // console.log('items', items);
      setData(items);
      }).catch((error) => {
        throw error;
      });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }
  , []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];

  return (
    <div>
      <h1>User Management</h1>
      <Table bordered dataSource={data} columns={columns} loading={loading} />
    </div>
  );
}

export default withUserManagement(SignUps);