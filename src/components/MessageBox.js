import React from "react";

export default class MessageBox extends React.Component {

    render(){
        const { message } = this.props;
        return <div key={message?.id} className={`relative flex flex-reverse gap-2 items-center ${message.user?.rol == 'IA' ? 'justify-end' : 'justify-start'}  `}>
        <div className={`h-6 w-6 rounded-full ${message?.user?.rol == 'IA' ? 'bg-gray-500' : 'bg-green-500'}`}>
            </div>
            <div className='flex flex-col'>
                <b>
                    {message?.user?.username}
                </b>
                <p>
                    {message?.currentMessage}
                </p>
            </div>
        
        </div>
    }
}