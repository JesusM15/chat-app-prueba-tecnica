import React from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';
import {withRouter, Redirect} from 'react-router-dom';
export default class ChatPage extends React.Component {
    static contextType = AuthContext;

    state = {
        messages: [],
        currentMessage:''
    }

    componentDidMount(){
        let messages = localStorage.getItem("messages");
        messages = JSON.parse(messages) || [];
        this.setState({ messages});
    }

    handleSendMessage(){
        const { currentMessage } = this.state;
        const message = this.state.currentMessage;

        const newList = [...this.state.messages, { currentMessage, user: this.context.user, id: Date.now() + 1 }];
        this.setState({
            messages: newList,
            currentMessage: ''
        })
        localStorage.setItem("messages", JSON.stringify(newList));
        this.responseIA(message, newList);
    }

    responseIA(message, newList){
        let IAMessage = {};
        const lowerCase = message.toLowerCase();
        if(lowerCase.includes('hola') || lowerCase.includes('buenas')){
            IAMessage = {
                currentMessage: `Hola, ${this.context.user.username}`,
            };
        }else if(lowerCase.includes("necesito") || lowerCase.includes("ayuda") || lowerCase.includes("necesito ayuda")){
            IAMessage = {
                currentMessage: `En un momento lo estaremos asistiendo`,
            }
        }else if(lowerCase.includes('gracias')){
              IAMessage = {
                currentMessage: `Estamos aqui para ayudarte`,
            }
        }else{
              IAMessage = {
                currentMessage: `Gracias por tu mensaje, ${this.context.user.username}`,
            }
        }
        IAMessage = {
            ...IAMessage,
            user: {
                rol: 'IA',
                username: 'IA'   
            },
            id: Date.now() + 1
        }
        const msgs = [...newList, IAMessage];
        this.setState({
            messages: msgs,
        })
        localStorage.setItem("messages", JSON.stringify(msgs));
    }

    render(){
        const { user }  = this.context;
        const { messages } = this.state;
        if(!this.context.user){
            return <Redirect to="/" />
        }
        return <div>
                <div className='flex gap-4 items-center p-3 justify-center shadow-xs m-auto'>
                    <h1 className='flex-1 text-md font-bold'>
                        Chat de {this.context.user?.username}
                    </h1>
                    <span className={`px-4 py-1 text-md bg-green-500 text-white rounded-xs`}>
                        {user.rol}
                    </span>
                </div>
                <ChatBox  
                messages={messages}
                />
                    { user?.rol == 'usuario'   && <div className='flex gap-2 p-1'>
            <input 
            className='flex-1 p-2 rounded-md shadow-md border  '
                    type="text"
                    placeholder='escribe un mensaje'
                    onChange={(e) => {
                        this.setState({
                            currentMessage: e.target.value
                        });
                    }
                    
                }
                value={this.state.currentMessage}
                />
                <button className='cursor-pointer hover:bg-green-600 transition-colors px-4 bg-green-400 rounded-md text-white' onClick={(e) => {
                    e.preventDefault();
                    this.handleSendMessage();
                }}>
                    Enviar mensaje
                </button>
         </div>  
                
                }

                <button 
                    className='mt-4 p-4 px-8 text-white bg-red-300 hover:bg-red-500 cursor-pointer transition-colors'
                onClick={(e) => {
                    e.preventDefault();
                    this.context.logout();
                }}>
                    Logout
                </button>
        </div>
    }
}