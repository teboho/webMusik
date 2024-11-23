// This page is the user management page. It is only accessible to the admin user.
// The admin user can add, edit, and delete users from this page.
// users are stored on firebase and are fetched from there.

import React, { useState, useEffect } from 'react';

// const useAuth = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//             setUser(user);
//             setLoading(false);
//         });

//         return unsubscribe;
//     }, []);

//     return { user, loading };
// }