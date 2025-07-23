import React from "react";
import { AuthContext } from "../context/AuthContext";
import {withRouter, Redirect} from 'react-router-dom';
import ButtonSelector from "../components/ButtonSelector";
class LoginPage extends React.Component {
    static contextType = AuthContext;

    state = {
        username: '',
        rol: 'usuario'
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { username } = this.state;

        if(username.trim() == ''){
            return;
        }
        
        this.context.login({ 
            username: username,
            rol: this.state.rol
        });

        this.props.history.push('/chat');
    }

    render() {
        if(this.context.user) {
            return <Redirect to="/chat" />
        }
        return <main className="flex items-center justify-center h-screen bg-gray-200">
            <form className=" flex items-center justify-center flex-col bg-white  p-12 shadow-2xl rounded-lg ">
                <h1 className="font-bold text-xl pb-4">
                    Inicia sesión
                </h1>
                <div className="flex flex-col gap-4">
                    <input 
                        className="p-2 outline-none rounded-sm shadow-md"
                    type="text" placeholder="Username" onChange={(e) => {
                        this.setState({ username: e.target.value });
                    }} />
                    <div className="flex gap-4">
                        <ButtonSelector 
                            rol="IA"
                            activeRol={this.state.rol}
                            onSelectRol={(rol) => this.setState({ rol })}

                        />
                        <ButtonSelector 
                            activeRol={this.state.rol}
                            onSelectRol={(rol) => this.setState({ rol })}
                             rol="usuario"
                        />
                    </div>
                    <button 
                        className="cursor-pointer transition-colors hover:bg-blue-800 px-8 p-2 text-white bg-blue-500"
                    onClick={this.handleLogin}>
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </main>
    }
}

export default withRouter(LoginPage);