import React from "react";

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    state = {
        user: null,
        login: this.login,
        logout: this.logout,
    }

    login = (userData) => {
        this.setState({ user: userData });
    }

    logout = () => {
        this.setState({ user: null });
    }

    render(){
        return (
            <AuthContext.Provider value={{
                user: this.state.user,
                login: this.login,
                logout: this.logout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}