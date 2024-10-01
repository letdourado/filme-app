'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function sucesso() {
    toast.success('Filme atualizado com sucesso');
}

function erro() {
    toast.error('Erro. Filme não atualizado.')
}


export default function Filme() { //basicamente primeiro encontra o filme e depois o substitui conforme dados do formulário
    const [filme, setFilme] = useState({ //"seta" os dados como vazio para serem substituidos quando encontrar o filme
        capa: '',
        titulo: '',
        diretor: '',
        imdb: '',
        ano: '',
        lancamento: '',
        genero: ''
    });
    const { id } = useParams(); //pega o id pela url

    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        async function fetchGeneros() { //procur os dados de get
            try {
                const response = await fetch('/api/gravar-genero', { method: 'GET' });
                const data = await response.json();
                setGeneros(data);
            } catch (error) {
                console.error('Erro ao buscar gêneros: ', error);
            }
        }

        fetchGeneros(); //chama funcao
    }, []);

    useEffect(() => {
        async function fetchEncontrar() { //funcao para encontrar o filme
            try {
                const response = await fetch(`/api/gravar-banco/${id}`, {  //chama a API para procurar o filme pelo ID
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                const data = await response.json(); //atribui a variavel o dado encontrado
                setFilme(data); //"seta" os dados do filme
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        }

        fetchEncontrar(); //execucao da funcao
    }, [id]);//atentar quando houver mudança de id

    const handleSubmit = async (e) => { //funcao assincrona que será chamada quando o botao submit for chamado para atualizar o filme
        e.preventDefault(); //impede recarregamento automatico da página

        console.log('Dados a serem enviados:', filme);  // Para verificar se os dados estão capturados corretamente

        try {
            const response = await fetch(`/api/gravar-banco/${id}`, { //chama api para atualizar no banco os dados do filme
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filme),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar filme');
            }

            const atualizacao = await response.json(); //atribui a variavel o dado encontrado
            console.log('Filme atualizado:', atualizacao);
            sucesso();
            setTimeout(() => {
                window.location.reload(); // Atualiza a página após o atraso
            }, 2000);
        } catch (error) {
            console.error('Erro ao atualizar filme:', error);
            erro();
            setTimeout(() => {
                window.location.reload(); // Atualiza a página após o atraso
            }, 2000);
        }
    };

    if (!filme) return <div>Carregando...</div>; // Caso filme nao seja encontrado ficará nessa mensagem

    return (
        <div className="bg-[#e5ebff] min-h-screen">
            <header className="header-padrao">
                <Link href="/"><button className='botao-padrao'>Pagina Inicial</button></Link>
                <h2 className='text-2xl'>CineCult</h2>
                <Link href="/sobre"><button className='botao-padrao'>Sobre</button></Link>
            </header>

            <h1 className="text-2xl flex items-center justify-center sm:p-10 font-[family-name:var(--font-geist-sans)]">Cadastrar filme</h1>

            <form onSubmit={handleSubmit}> {/*Define que quando for enviado, chamará assincronamente a função */}
                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="capa">Capa do filme - Link</label>
                    <input type="text" className="form-control" id="capa" value={filme.capa} onChange={(e) => setFilme({ ...filme, capa: e.target.value })} />
                </div> {/*caso haja mudança no valor, apenas o valor da capa é passada ao setfilme, mantendo os demais caso não haja mudança, alterand somente esse campo */}

                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" className="form-control" id="titulo" value={filme.titulo} onChange={(e) => setFilme({ ...filme, titulo: e.target.value })} />
                </div>

                <div className="form-group col-md-6 mb-4">
                    <label htmlFor="diretor">Diretor</label>
                    <input type="text" className="form-control" id="diretor" value={filme.diretor} onChange={(e) => setFilme({ ...filme, diretor: e.target.value })} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="imdb">IMDB</label>
                        <input type="text" className="form-control" id="imdb" value={filme.imdb} onChange={(e) => setFilme({ ...filme, imdb: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ano">Ano</label>
                        <input type="number" className="form-control" id="ano" value={filme.ano} onChange={(e) => setFilme({ ...filme, ano: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="data">Data de lançamento</label>
                        <input type="date" className="form-control" id="data" value={filme.data} onChange={(e) => setFilme({ ...filme, data: e.target.value })} />
                    </div>
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="genero">Gênero</label>
                    <select id="genero" className="form-control">
                        <option value="" disabled>Escolher...</option>
                        {generos.map((genero) => ( //mapea todos os generos encontrados para mostrar eles
                            <option key={genero.id} value={genero.genero}>
                                {genero.genero}
                            </option>
                        ))}
                    </select>
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
