import React from 'react'

const ButtonModal = ({handleSubmit, isDisbledBtn}) => {
    return (
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="bg-blue-600 text-white disabled:bg-blue-300 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
                disabled={isDisbledBtn}
                data-cy="modal-button-simpan"
            >
                SIMPAN
            </button>
        </div>
    )
}

export default ButtonModal