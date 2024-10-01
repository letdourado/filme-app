import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) { //encontra o filme indicado pelo ID e retorna os dados dele
    const { id } = params; //pega id pela url

    try {
        if (req.method === 'GET') {
            const filme = await prisma.filme.findUnique({ //encontra no banco conforme id passado pela url
                where: { id: Number(id) },
            });

            if (filme) {
                return new Response(JSON.stringify(filme), { //retorna resposta com os dados do filme em json e status de sucesso
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                return new Response(JSON.stringify({ error: 'Filme não encontrado' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        return new Response(JSON.stringify({ error: 'Método não permitido' }), { //se metodo for diferente
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro interno:', error); // Log do erro
        return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(req, { params }) { //atualiza filme q solicita atualizacao conforme id
    const { id } = params;

    if (req.method === 'PUT') {
        const data = await req.json();
        try {
            const filmeExistente = await prisma.filme.findUnique({
                where: { id: Number(id) },
            });

            if (!filmeExistente) {
                return new Response(JSON.stringify({ error: 'Filme não encontrado' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const filmeAtualizado = await prisma.filme.update({ //atualiza no prisma conforme id
                where: { id: Number(id) },
                data: {
                    capa: data.capa,
                    titulo: data.titulo,
                    diretor: data.diretor,
                    imdb: parseFloat(data.imdb),
                    ano: Number(data.ano),
                    data: data.data,
                    genero: data.genero,
                },
            });

            return new Response(JSON.stringify(filmeAtualizado), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Erro ao atualizar filme:', error);
            return new Response(JSON.stringify({ error: 'Erro ao atualizar filme' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
    });
}


export async function DELETE(req, { params }) {
    const { id } = params; // Obtém o ID diretamente dos parâmetros da URL

    try {
        // Verifica se o filme existe antes de tentar deletar
        const filmeExistente = await prisma.filme.findUnique({
            where: { id: Number(id) }, // Certifique-se de que o ID é um número
        });

        if (!filmeExistente) {
            return new Response(JSON.stringify({ error: 'Filme não encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Deleta o filme
        const filmeDeletado = await prisma.filme.delete({
            where: { id: Number(id) }, // Certifique-se de que o ID é um número
        });

        // Retorna a resposta com o filme deletado
        return new Response(JSON.stringify(filmeDeletado), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro ao deletar o filme:', error);
        return new Response(JSON.stringify({ error: 'Erro ao deletar o filme' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}