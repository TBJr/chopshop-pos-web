import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";
import { createSelector } from "reselect";

const Logout = () => {
    const dispatch = useDispatch<any>();

    const isUserLogoutSelector = createSelector(
        (state) => state.Login,
        (isUserLogout) => isUserLogout.isUserLogout
    );
    const isUserLogout = useSelector(isUserLogoutSelector);

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    if (isUserLogout) {
        return <Navigate to="/login" />;
    }

    return <></>;
};

Logout.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Logout);