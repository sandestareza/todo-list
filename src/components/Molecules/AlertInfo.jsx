import iconAlert from '../../assets/icons/icon-alert-info.svg'

const AlertInfo = () => {
    
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-96 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                
                        <div className="relative p-6 flex-auto">
                            <div className="flex gap-x-5 justify-center px-10">
                                <img src={iconAlert} alt="iconAlert" />
                                <h6 className="w-full text-lg text-center">
                                    Activity berhasil dihapus
                                </h6>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AlertInfo