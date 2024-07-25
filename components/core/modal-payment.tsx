
import Link from "next/link"
import PaymentFinal from "@/pages/paypal/payment-final";
type Props = {
    show: boolean;
    setShow: any;
    data?: any;
    mode_paiement?: any

}
const ModalPayment: React.FC<Props> = ({ show, setShow, data, mode_paiement }) => {

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
                                    <h3 className="text-2xl text-blue-500 text-center">Paiement </h3>

                                    <button
                                        onClick={e => {
                                            setShow(!show)
                                        }}
                                        type="button"
                                        className="text-red-500 font-bold  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        X
                                    </button>
                                </div>{" "}
                                {/*body*/}
                                <div className="relative p-6 flex-auto">


                                    <div className="w-full">

                                        <h2 className="text-2xl">Paiement via PayPal</h2>
                                        <hr />
                                        <div className="block mt-4">
                                            {/* <p>Mode paiement: <span className="font-semibold">{data?.data?.modePiement}</span></p> */}
                                            <p>Montant à payer: <span className="font-semibold"> {data?.data?.montant_participation} {data?.data?.devise}</span></p>
                                        </div>
                                        <div className="mt-4 flex flex-col">
                                            {/* <PaymentButton amount={montant} /> */}
                                            <PaymentFinal from={"inscription"} amount={data?.data?.montant_participation} data={data?.data} />
                                        </div>
                                        {/* <Link
                                                    className="text-blue-500 hover:text-blue-300 block my-4"
                                                    href={`/paiements`}
                                                >Payer maintenant</Link> */}
                                    </div>

                                    {/* (hyperlien) Faire un don */}
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

export default ModalPayment;
