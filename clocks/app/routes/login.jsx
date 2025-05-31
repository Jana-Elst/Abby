import { NavLink } from "react-router";

const Login = () => {
    return (
        <>
            <h1>Hier vul je je login in. Maar nu kan je gwn even op 'Login' klikken</h1>
            <NavLink to="/form">Login</NavLink>
        </>
    );
};

export default Login;