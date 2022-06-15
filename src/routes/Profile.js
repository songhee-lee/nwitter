import { authService} from "fbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export default ({ userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};