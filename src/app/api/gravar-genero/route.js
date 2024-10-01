import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) { //cria novo genero
    if (req.method === 'POST') {

        try {
            const corpo = await req.json();
            console.log(corpo)

            const { genero } = corpo;

            const novoGenero = await prisma.genero.create({
                data: {
                    genero,
                },
            });

            return new Response(JSON.stringify(novoGenero), { status: 201 });

        } catch (error) {
            console.error('Erro ao salvar o gênero: ', error);
            return new Response(JSON.stringify({ error: 'Erro ao salvar o gênero' }), { status: 500 });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}

export async function GET(req) { //busca todos os generos
    if (req.method === 'GET') {
        try{
            const generos = await prisma.genero.findMany();
            return new Response(JSON.stringify(generos), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error){
            console.error('Erro ao salvar o filme:', error);
        }
        
    }
}