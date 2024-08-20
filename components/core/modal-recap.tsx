
import Link from "next/link"
import PaymentFinal from "@/pages/paypal/payment-final";
type Props = {
    show: boolean;
    setShow: any;
    data?: any;
    mode_paiement?: any

}
const ModalRecap: React.FC<Props> = ({ show, setShow, data, mode_paiement }) => {
    // console.log(data)

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
                                    <h3 className="text-2xl text-blue-500 text-center">Récapitulatif </h3>

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
                                    <Link className="text-blue-500 hover:text-blue-300 block my-4" href={'/'}>Retour à la page principale</Link>
                                    <p className="uppercase">merci pour votre inscription</p>
                                    <p>Numéro de confirmation: <span className="font-semibold">{data?.data?.username}</span></p>
                                    <p> Nous enverrons prochainement un accusé de réception au(x) courriel(s) que vous avez spécifié(s).</p>
                                    {/* <Récapitulatif> */}
                                    <p>Mode participation: <span className="font-semibold">{data?.data?.mode_participation}</span></p>
                                    {data?.data?.mode_participation !== 'DISTANCIEL' && <>
                                        <p>Lieu: <span className="font-semibold">{`${data?.data?.nomPays}, ${data?.data?.ville?.libelleDepartement}, ${data?.data?.ville?.libelle}(${data?.data?.libelleLocal})`}</span></p>
                                        <p>Mode paiement: <span className="font-semibold">{data?.data?.modePiement}</span></p>
                                        <p>Montant: <span className="font-semibold"> {data?.data?.montant_participation} {data?.data?.devise}</span></p>


                                    </>}
                                    <Link
                                        className="mt-4 text-blue-500 block hover:text-blue-300"
                                        href={`/liste-participants/${data?.data?.idEvent}`}
                                    >Tableau des inscrits</Link>
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

export default ModalRecap;
