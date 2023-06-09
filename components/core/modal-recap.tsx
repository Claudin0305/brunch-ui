import React from "react";
type Props = {
    show: boolean;
    setShow: any;
    data?: any;

}
const ModalRecap: React.FC<Props> = ({ show, setShow, data }) => {

    return (
        <>
            {/* <ButtonModal name={'Ajouter'} icon={<IoIosAddCircle/>} handleClick={setShowModal}/> */}
            {show ? (
                <>
                    <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative  w-3/5 overflow-y-scroll my-auto h-3/5 mx-auto max-w-12xl">
                            {" "}
                            {/*content*/}
                            <div
                                className={`first-letter:border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none overflow-y-scroll w-full bg-white`}
                            >
                                {" "}
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl text-blue-500 text-center">Recapitulation </h3>

                                    <button
                                    onClick={e=>{
                                        setShow(!show)
                                    }}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>{" "}
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    recap
                                </div>
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"> </div>{" "}
                </>
            ) : null}{" "}
        </>
    );
}

export default ModalRecap;
