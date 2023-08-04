import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
type Props = {
    show: boolean;
    setShow: any;
    selectedDept: any;
    setSelectedVille: any;

}
type Inputs = {
    libelle: string;
};
const ModalAddVille: React.FC<Props> = ({ show, setShow, selectedDept, setSelectedVille }) => {
 const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const createVille = (data: Inputs | FormData) => {

        axios.post(`${process.env.base_route}/villes/from-client`, data).then(response => {
            console.log(response);
            if (response.status === 201) {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Enregistrement effectué!',
                    // showConfirmButton: false,
                    // timer: 1500
                    // buttonColor:"#000000",
                    // buttons:[""]
                    confirmButtonColor: "#2563eb",
                    confirmButtonText: "Fermer",
                })
                setIsSubmit(false);
                reset();
                setSelectedVille({
                    label: response.data.libelle,
                    value:response.data.id_ville
                })
                setShow(!show);
            }
        }).catch(err => {
            setIsSubmit(false);
            if (err.response.status === 400) {
                setResponseError(err.response.data);
                // console.log(responseError)
                //sweal error
            }
        })


    };
    const onSubmit: SubmitHandler<Inputs> = data => {
        // console.log(data)

        setIsSubmit(true);
        const formData = new FormData();
        formData.append('libelle', data.libelle);
        formData.append('id_departement', selectedDept?.value)
            createVille(formData);


    };
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
                                    <h3 className="text-2xl text-blue-500 text-center">Ajouter ville </h3>

                                    <button
                                    onClick={e=>{
                                        setShow(!show)
                                    }}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>{" "}
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit(onSubmit)} className="center">
                                        {/* register your input into the hook by invoking the "register" function */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="block">

                                                <TextField
                                                    required
                                                    autoComplete="given-name"
                                                    fullWidth
                                                    id="libelle"
                                                    size="small"
                                                    label="Libelle ville"
                                                    {...register("libelle", { required: true })}
                                                />
                                                {responseError !== null && <Error text={responseError?.libelle} />}
                                            </div>

                                        </div>
                                        <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8">
                                            <Button
                                                type="reset"
                                                className="text-blue-600 border-blue-600 capitalize"
                                                variant="outlined"
                                            >
                                                Reinitialiser
                                            </Button>

                                            <Button
                                                disabled={isSubmit}
                                                type="submit"
                                                className="bg-blue-600 capitalize text-white flex items-center justify-center gap-x-2"
                                                variant="contained"
                                            >
                                                {isSubmit && <CircularIndeterminate />} <span> Ajouter</span>
                                            </Button>
                                        </div>

                                    </form>
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

export default ModalAddVille;
