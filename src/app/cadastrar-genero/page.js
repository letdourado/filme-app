'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; // Importa o Yup para validação
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Funções para notificação de sucesso e erro
function sucesso() {
    toast.success('Gênero cadastrado com sucesso');
}

function erro() {
    toast.error('Erro. Gênero não cadastrado.');
}


const schema = yup.object().shape({ //esquema yup, todos os campos obrigatórios
    genero: yup.string().required('O campo Gênero é obrigatório'),
});

export default function Generos() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => { //funcao assincrona que irá capturar o dado e manipulará
        try {
            const resposta = await fetch('/api/gravar-genero', { //chamada da api que irá gravar no banco
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (resposta.ok) {
                const resultado = await resposta.json();
                console.log('Cadastro ok ', resultado);
                sucesso();
                setTimeout(() => {
                    window.location.reload(); // Atualiza a página após o atraso
                }, 2000);

            } else {
                console.log('Erro ao cadastrar: ', await resposta.json());
                erro();
            }
        } catch (error) {
            console.log('Erro ao cadastrar 123 ', error);
            erro();
        }
    };

    return (
        <div className="bg-[#e5ebff] min-h-screen">
            <header className="header-padrao">
                <Link href="/"><button className='botao-padrao'>Pagina Inicial</button></Link>
                <h2 className='text-2xl'>CineCult</h2>
                <Link href="/sobre"><button className='botao-padrao'>Sobre</button></Link>
            </header>

            <h1 className="text-2xl flex items-center justify-center sm:p-10 font-[family-name:var(--font-geist-sans)]">Cadastrar gênero</h1>

            <form onSubmit={handleSubmit(onSubmit)} > {/*Chamada da função que capturá os dados */}
                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="genero">Gênero</label>
                    <input type="text"className="form-control" id="genero" {...register("genero")}/>
                    {errors.genero && <p className="text-red-500">{errors.genero.message}</p>}
                </div>

                <div className="form-row">
                    <button type="submit" className="botao-padrao bg-slate-300 mt-8 text-white">Salvar</button>
                    <Link href="/catalogo">
                        <button className="botao-padrao bg-slate-300 mt-8 text-white">Voltar</button>
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
