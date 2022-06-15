import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default ({userObj}) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorID", "==", userObj.uid)
            .orderBy("CreatedAt")
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};