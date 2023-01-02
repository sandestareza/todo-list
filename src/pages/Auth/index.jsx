import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

import SwalConfirm from '../../components/Molecules/SwalConfirm'

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const [inputEmail, setInputEmail] = useState("")
    const [showSwal, setShowSwal] = useState(false)

    const handleSubmit = (e) => {

        e.preventDefault()

        if (inputEmail) {         
            
            localStorage.setItem('email' , inputEmail)

            setTimeout(() => {
                setShowSwal(true)                
            }, 1000);

        } 

    }

    useEffect(() => {
        const email = localStorage.getItem('email')

        setTimeout(() => {
            if (email) setInputEmail('email') 
            
        }, 1000);
    }, [])
    

    return (
        <Layout>
            <div data-cy="login-content" className='container mx-auto lg:px-36 px-10 mt-20'>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="flex items-center border-b border-blue-500 py-2">
                    <input value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} type="email" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Masukkan email" aria-label="Email" />
                    <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                    Simpan
                    </button>
                </div>
            </form>
            </div>

            {
                showSwal ?
                <SwalConfirm data-cy="modal-delete" aletInfo={true} setShowSwal={setShowSwal} textConfirm={`Email ${inputEmail} berhasil ditambahkan`} url="/"/>
                :
                null
            }
            
        </Layout>
    )
}

export default Login