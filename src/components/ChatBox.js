import React from "react";
import MessageBox from "./MessageBox";

export default class ChatBox extends React.Component {

    render(){
        const { messages } = this.props;
        return <section className='h-96 bg-gray-50 flex-1 overflow-y-auto p-4 '>
                <div>
                    {messages?.map((message) => {
                        return <MessageBox
                            key={message?.id}
                            message={message}
                        />
                    })}
                </div>
            </section>
    }
}