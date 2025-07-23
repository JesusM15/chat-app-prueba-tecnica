import React from "react";

export default class ButtonSelector extends React.Component {

    render(){
        const { rol, activeRol, onSelectRol } = this.props;
        
        const isActive = rol == activeRol;
        return <button
            onClick={(e) => { 
                e.preventDefault();
                onSelectRol(rol);
            }}
            className={`cursor-pointer p-2 px-12 text-black ${isActive? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 transition-colors'}`}>
                {rol}
            </button>
        }
}