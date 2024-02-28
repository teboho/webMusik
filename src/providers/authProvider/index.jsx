import React, { useEffect, useReducer, useState } from 'react';
import { authReducer, } from './reducers';
import { AuthContext } from './contexts'
import { setProfileAction, setProfileImageAction, } from './actions';
import { fetchProfile } from '../../utilities/Auth';
import { Drawer, Image, Descriptions, Button } from 'antd';

const defaultProfile = {
    "country": "",
    "display_name": "",
    "email": "",
    "explicit_content": {
      "filter_enabled": false,
      "filter_locked": false
    },
    "external_urls": {
      "spotify": ""
    },
    "followers": {
      "href": "",
      "total": 0
    },
    "href": "",
    "id": "",
    "images": [
      {
        "url": "",
        "height": 0,
        "width": 0
      }
    ],
    "product": "",
    "type": "",
    "uri": ""
};


export function logOut() {
    localStorage.clear();
    document.location.reload();
}

/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */
function AuthProvider(props) {
    // Making the state with the reducer
    const [authState, dispatch] = useReducer(authReducer, {token: "", profileImage: "", profile: defaultProfile});
    const [open, setOpen] = useState(false);

    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        if (accessToken !== null && accessToken !== undefined)
        // we need to fetch and store the user profile
        fetchProfile(accessToken)
            .then(profile => {
                console.log("Callback found profile");
                console.log(profile);
                saveProfile(profile);
                saveProfileImage(profile.images ? profile.images[0].url : "");
            }).catch(err => {
                console.log("Could not get profile in the login callback");
            });
    }, []);

    /**
     * 
     * @param {*} url image url
     */
    const saveProfileImage = (url) => {
        dispatch(setProfileImageAction(url));
    }

    /**
     * 
     * @param {*} profile profile object
     */
    const saveProfile = (profile) => {
        dispatch(setProfileAction(profile));
    }

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const items = [];
    items.push({
        key: "country",
        label: "Country",
        children: authState.profile.country
    });
    items.push({
        key: "email",
        label: "Email",
        children: authState.profile.email
    });
    items.push({
        key: "type",
        label: "Type",
        children: authState.profile.type
    });
    items.push({
        key: "uri",
        label: "URI",
        children: authState.profile.uri
    });
    items.push({
        key: "link",
        label: "Link",
        children: authState.profile.href
    });

    const profileDrawer = 
        typeof(accessToken) === "string" ? 
            (<Drawer title={authState.profile.display_name} onClose={onClose} open={open} size='large'>
                
                <Button type='primary' style={{background: "rgb(255, 20, 10)"}} onClick={logOut}>
                    Logout
                </Button>
                {authState.profile.images.length > 0 && authState.profile.images[0].url.length > 0 ? 
                <div style={{margin: "0 auto", textAlign: "center"}}>
                    <Image style={{ width: "200px"}} src={authState.profile.images[1].url} alt="profile picture" /> 
                </div>
                    : null
                }
                <Descriptions title="Profile Info" bordered items={items} layout='vertical' style={{
                    
                }}/>
            </Drawer>) 
        : null;

    const searchResultsDrawer = (
        <Drawer>

        </Drawer>
    );

    return (
        <AuthContext.Provider value={{authState, saveProfileImage, saveProfile, showDrawer}}>
            {/* context for drawer */}
            {profileDrawer}
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;