import React, { useState } from 'react';
import './Modal.css';

function SaveSegment() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <div className="">
                <div className="w-screen">
                    <header className='w-full bg-blue-300 h-20'></header>
                    <div className='p-6 w-full'>
                        <button className='bg-gray-300 text-black p-2 border' onClick={toggleModal}>Save segment</button>
                    </div>

                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className='mt-1 modal-content flex-col justify-around items-center'>

                        <header className='w-full bg-blue-300 h-20 modal-header p-2 flex justify-start items-center'>
                            <button className="m-1" onClick={toggleModal}>
                                X
                            </button>
                            Save Segment
                        </header>
                        <p className='p-2 flex justify-start'> 
                            <div className='flex-col justify-center items-center m-4'>
                                <h3>Enter the Name of the Segment</h3>
                                <input className='w-96 h-10 p-4 mt-4 border border-black' placeholder='Name of the Segment'/>
                                <p className='p-2 mt-5'>
                                    To save your segment, you need to add the schemas to build the query
                                </p>
                                <div className='p-4 flex justify-end items-center'>
                                    <button className='rounded-full bg-green-500 w-2 h-2'></button>
                                    <span className='text-xs ml-1'> - User Traits</span>
                                    <button className='ml-2 rounded-full bg-red-500 w-2 h-2'></button>
                                    <span className='text-xs ml-1'> - Group Traits</span>
                                    
                                </div>
                            </div>
                        </p>
                        <footer className='w-full bg-slate-300 h-20 flex justify-start items-center footer-modal'>
                            <button className='p-2 h-10 bg-green-500 rounded-sm m-2 text-white font-semibold'>
                                Save the Segment
                            </button>
                            <button className='p-2 h-10 bg-white text-red-500 rounded-sm font-semibold' onClick={toggleModal}>
                                Cancel
                            </button>
                        </footer>
                    </div>


                </div>
            )}
        </>
    )
}

export default SaveSegment