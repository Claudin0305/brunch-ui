
import { useState, useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Error from "@/components/core/error";
import CircularIndeterminate from "@/components/core/circular-indeterminate";
type Inputs = {
    password: string;

};
type Props = {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}
const AdminForm: React.FC<Props> = ({ isAdmin, setIsAdmin }) => {
    const { register, handleSubmit, watch, reset, setValue, getValues, control, formState: { errors } } = useForm<Inputs>();
    const [isFail, setIsFail] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const onSubmit: SubmitHandler<Inputs> = data => {
        setIsSubmit(true);
        if (data.password === process.env.PASSWORD) {
            setIsAdmin(true)
            setIsFail(false)
        } else {
            setIsAdmin(false);
            setIsFail(true)
        }
        setIsSubmit(false)

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                <div className="block">

                    <TextField
                        required
                        fullWidth
                        id="password"
                        size="small"
                        type="password"
                        label="Mot de passe"
                        {...register("password", {
                            required: "Vous avez omis de spécifier un champ obligatoire sur cette page.  Veuillez préciser tous les champs obligatoires (ils sont marqués d’un astérisque)", minLength: {
                                value: 2,
                                message: "Ce champ doit avoir au moins 2 caractères"
                            }
                        })}
                        className="md:mt-3"

                    />
                    {/* {responseError !== null && <Error text={responseError?.libelle}/>} */}
                    {/* {errors?.nom && <Error text={errors.nom.message} />} */}

                    {isFail && <div className="block"> <Error text={'Le mot de passe est incorrect!'} /> </div>}
                </div>
                <div className="flex justify-end flex-col mt-8 md:flex-row gap-8 mb-8">
                    {/* <Button
                        type="reset"
                        className="text-blue-600 border-blue-600 capitalize"
                        variant="outlined"
                    >
                        Reinitialiser
                    </Button> */}

                    <Button
                        disabled={isSubmit}
                        type="submit"
                        className="bg-blue-600 capitalize text-white flex items-center justify-center gap-x-2"
                        variant="contained"
                    >
                        {isSubmit && <CircularIndeterminate />} <span>Envoyer</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AdminForm
