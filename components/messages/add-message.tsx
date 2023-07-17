import React, { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import CircularIndeterminate from "@/components/core/circular-indeterminate";
import Error from "@/components/core/error";
import axios from 'axios';
import { useRouter } from 'next/router'
import Select from 'react-select';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>chargement ...</p>,
});

type option = {
    label: string;
    value: string;
}
type Inputs = {
    libelle_texte: string;
    subject: string;
    message_type: option | string | any;
};
type Props = {
    data_props: any | null;
}


const AddMessage: React.FC<Props> = ({data_props}) => {
    // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }));
  const [valueText, setValueText] = useState<string | any>("");
    const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
    const router = useRouter()
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<Inputs>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<any>(null);
    const [options, setOptions] = useState<option[] | any>(null);

    useEffect(() => {

        if (data_props !== null) {

      setValue('subject', data_props.subject)
      setValue('libelle_texte', data_props.libelleTexte)
            const result = options?.filter((o:any)=>o.value === data_props.messageType)[0];
            setValue('message_type', result);
    setValueText(data_props.libelleTexte)

        }
    }, [options])

    useEffect(() => {
        const tableOptions: option[] = [
            {
                label:'Inscription',
                value:'INSCRIPTION'
            },
            {
                label:'Paiement',
                value:'PAIEMENT'
            }
        ];
        tableOptions.sort((a, b) => {
            let fa = a.label,
                fb = b.label;

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });


        setOptions(tableOptions);
    }, []);

//ReactQuill
//    const handleQuillChange = (content, delta, source, editor) => {
//     //  setValueText(content)
//     try{

//         setValue('libelle_texte', content);
//     }catch(e){
//         console.log(e);
//     }
//   };

    const updateMessage = (data: Inputs | FormData) => {
        axios
            .put(`${process.env.base_route}/messages/${data_props.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
            .then((response) => {
                if (response.status === 200) {

                    setIsSubmit(false);
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Modification effectuée!',

                        confirmButtonColor: "#2563eb",
                        confirmButtonText: "Fermer",
                    })
                    router.push('/messages')

                    reset();
                }

            })
            .catch((err) => {
                console.log(err)
                // if (err.response.status === 400) {
                //     setResponseError(err.response.data);
                // }
                setIsSubmit(false);
            });


    };
    const createMessage = (data: Inputs |FormData) => {

        axios.post(`${process.env.base_route}/messages`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
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
                setValue('message_type', null)
                setValueText("");
                // setValue('libelle_text', null)
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
        data.message_type = data.message_type?.value
        const formData = new FormData();
        formData.append('libelleTexte', data.libelle_texte);
        formData.append('messageType', data.message_type)
        formData.append('subject', data.subject)

    setValueText(data.libelle_texte)
        if (data_props === null) {
            createMessage(formData);
        } else {
            updateMessage(formData)
        }

    };

    return (
        <div className="container">
            <h1 className="font-bold text-sm md:text-lg capitalize mb-8">
                {data_props === null ? 'Ajouter' : 'Modifier'} Message
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="center">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                     <div className="block">

                        <TextField
                            required
                            autoComplete="given-name"
                            fullWidth
                            id="subject"
                            size="small"
                            label="Objet du message"
                            {...register("subject", { required: "Ce champ est obligatoire" })}
                        />
                        {responseError !== null && <Error text={responseError?.subject} />}
                        {errors?.subject && <Error text={errors.subject.message} />}
                    </div>
            <div className="flex-col flex md:-mt-8">
                        <label
                            className="mb-2"
                            htmlFor={`message_type`}
                        >
                            {" "}
                            Type de message*{" "}
                        </label>
                        <Controller
                            name={`message_type`}
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={
                                        "Choisir le type du message..."
                                    }
                                    isClearable
                                    options={options}
                                />
                            )}
                        />{" "}

                    </div>


          <div className="row-span-5">
             <QuillNoSSRWrapper
              modules={modules}
              theme="snow"
              placeholder="contenu du message...*"
            //    {...register('libelle_texte', { required: "Ce champ est obligatoire!" })}
        // onChange={handleQuillChange}
              onChange={e=>{
                // console.log(e)
                setValueText(e)
                setValue('libelle_texte', e);
              }}
              value={valueText}
            />

              {errors?.libelle_texte && <Error text={errors.libelle_texte.message} />}
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
                        {isSubmit && <CircularIndeterminate />} <span>{data_props === null ? 'Ajouter' : 'Modifier'}</span>
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default AddMessage;
