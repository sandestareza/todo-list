import React from 'react'

const Button = ({type, name, icon, onClick}) => {
    return (
        <button 
            type={type} 
            className="w-40 h-14 rounded-full bg-0-primary text-white font-bold flex items-center justify-center"
            onClick={onClick}
            data-cy="activity-add-button"
        >
            {icon ? <span className={icon}></span> : ''}
            {name}
        </button>
    )
}

export default Button