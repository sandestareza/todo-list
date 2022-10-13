import React from 'react'
import Title from '../Atoms/Title'

const Navbar = () => {
    return (
        <div className='w-full bg-[#16ABF8] flex items-center px-10 lg:px-36 h-[105px]'>
            <div data-cy="header-title" className='container mx-auto'>
                <Title name="TO DO LIST APP" className="text-white font-bold text-2xl"/>
            </div>
        </div>
    )
}

export default Navbar