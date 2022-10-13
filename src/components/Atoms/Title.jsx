import React from 'react'

const Title = ({name, className}) => {
    return (
        <h1 data-cy="activity-title" className={className}>{name}</h1>
    )
}

export default Title