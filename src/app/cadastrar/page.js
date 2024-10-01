'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function sucesso() {
    toast.success('Filme cadastrado com sucesso');
}

function erro() {
    toast.error('Erro. Filme não cadastrado.');
}

const validationSchema = Yup.object().shape({ //validacao yup = todos itens sao obrigatorios
    capa: Yup.string().required('Capa do filme é obrigatória'),
    titulo: Yup.string().required('Título é obrigatório'),
    diretor: Yup.string().required('Diretor é obrigatório'),
    imdb: Yup.string().required('IMDB é obrigatório'),
    ano: Yup.string().required('Ano é obrigatório'),
    data: Yup.string().required('Data é obrigatório'),
    genero: Yup.string().required('Gênero é obrigatório'),
});

export default function Catalogo() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        async function fetchGeneros() { //funcao para chamar a api para buscar os generos cadastrados
            try {
                const response = await fetch('/api/gravar-genero', { method: 'GET' });
                const data = await response.json();
                setGeneros(data);
            } catch (error) {
                console.error('Erro ao buscar gêneros: ', error);
            }
        }

        fetchGeneros(); //chama a funcao
    }, []);

    const onSubmit = async (data) => { //funcao assicrona que capturar os dados e manipulará quando submeter o formulario
        try {
            const resposta = await fetch('/api/gravar-banco', { //chama a api que irá gravar no banco
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (resposta.ok) {
                const resultado = await resposta.json();
                console.log('Cadastro ok ', resultado);
                sucesso();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.log('Erro ao cadastrar: ', await resposta.json());
                erro();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.log('Erro ao cadastrar: ', error);
        }
    };

    return (
        <div className="bg-[#e5ebff] min-h-screen">
            <header className="header-padrao">
                <Link href="/"><button className='botao-padrao'>Pagina Inicial</button></Link>
                <h2 className='text-2xl'>CineCult</h2>
                <Link href="/sobre"><button className='botao-padrao'>Sobre</button></Link>
            </header>

            <h1 className="text-2xl flex items-center justify-center sm:p-10 font-[family-name:var(--font-geist-sans)]">Cadastrar filme</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="capa">Capa do filme - Link</label>
                    <input type="text" className="form-control" id="capa" {...register("capa")} /> {/*Register conectar o campo input com a de valizacao */}
                    {errors.capa && <p className="text-red-600">{errors.capa.message}</p>} {/*Mensagem que aparecerá quando estiver vazio o campo*/}
                </div>

                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" className="form-control" id="titulo" {...register("titulo")} />
                    {errors.titulo && <p className="text-red-600">{errors.titulo.message}</p>}
                </div>

                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="diretor">Diretor</label>
                    <input type="text" className="form-control" id="diretor" {...register("diretor")} />
                    {errors.diretor && <p className="text-red-600">{errors.diretor.message}</p>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="imdb">IMDB</label>
                        <input type="float" className="form-control" id="imdb" {...register("imdb")} />
                        {errors.imdb && <p className="text-red-600">{errors.imdb.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ano">Ano</label>
                        <input type="number" className="form-control" id="ano" {...register("ano")} />
                        {errors.ano && <p className="text-red-600">{errors.ano.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="data">Data de lançamento</label>
                        <input type="date" className="form-control" id="data" {...register("data")} />
                        {errors.data && <p className="text-red-600">{errors.data.message}</p>}
                    </div>
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="genero">Gênero</label>
                    <select id="genero" {...register("genero")} className="form-control" defaultValue=""> 
                        <option value="" disabled>Escolher...</option> {/*Valor pradao é escolher */}
                        {generos.map((genero) => ( 
                            <option key={genero.id} value={genero.genero}> {/*Mapea para exibir todos os generos encontrados */}
                                {genero.genero}
                            </option>
                        ))}
                    </select>
                    {errors.genero && <p className="text-red-600">{errors.genero.message}</p>}
                </div>

                <div className="form-row">
                    <button type="submit" className="botao-padrao bg-slate-300 mt-8 text-white">Salvar</button>
                    <Link href="/catalogo">
                        <button type="button" className="botao-padrao bg-slate-300 mt-8 text-white">Voltar</button>
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
