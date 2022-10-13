import React from 'react'

export const TitleModal = ({setShowModal, isedit}) => {
    return (
        <>
            <h3 className="text-xl font-semibold" data-cy="modal-add-edit-title">
               {
                    isedit ?  "Edit Item" : "Tambah List Item"
               }
            </h3>
            <button data-cy="modal-button-close"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
            >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                </span>
            </button>
        </>
    )
}
