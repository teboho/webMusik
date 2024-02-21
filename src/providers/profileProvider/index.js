import React from "react";
import { ProfileContext } from "./context";

export default function ProfileProvider(props) {
    return (
        <ProfileContext.Provider value="">
            {props.children}
        </ProfileContext.Provider>
    );
}