
import iconSwalDelete from '../../assets/icons/icon-swal-delete.svg'
import iconAlertInfo from '../../assets/icons/icon-alert-info.svg'
import { useNavigate } from 'react-router-dom';

const SwalConfirm = ({aletInfo = false, setShowSwal, data = null, handleDeleteTodo = null, textConfirm, url = false}) => {
    const navigate = useNavigate()

    const handleClikBtn = () => {

        if (url) {

            navigate(url)
            
        } else {

            setShowSwal(url)
        } 


    }

    return (
        <>
        <div data-cy="modal-delete" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                
                    <div className="relative p-6 flex-auto">
                        <div className="flex justify-center py-10">
                            <img style={{width:80}} src={aletInfo ? iconAlertInfo : iconSwalDelete} alt="iconSwalDelete"/>
                        </div>
                        <div className="flex justify-center px-10">
                            <h6 className="my-4 w-full text-lg text-center">
                                {textConfirm} 
                                {
                                    data &&
                                    <span className='text-black font-bold ml-2'>"{data?.title}?"</span> 
                                }
                            </h6>
                        </div>
                        <div className="flex gap-x-4 justify-center px-14 mt-10">
                            <button data-cy="modal-delete-cancel-button" onClick={handleClikBtn} className='bg-slate-200 text-slate-800 font-bold rounded-full w-28 px-6 py-3'>{aletInfo ? 'Oke' : 'Batal'}</button>
                            {
                                handleDeleteTodo &&
                                <button data-cy="modal-delete-confirm-button" onClick={handleDeleteTodo} className='bg-red-500 text-white rounded-full w-28 px-6 py-3'>Hapus</button>
                            }
                        </div>
                    </div>    
                </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default SwalConfirm