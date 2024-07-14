import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'

export default class StatesController {
    //Lista usuários
    public async index({ response }: HttpContextContract) {
        try {
            const state = await State.all()
            response.status(200).json({
                message: ' Estado das vagas listado com sucesso',
                data: state
            })
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao listar usuários',
                error: error.message
            })
        }
    }
    public async show({ params, response }: HttpContextContract) {
        try {
            const stateId = parseInt(params.id);
            const state = await State.findOrFail(stateId);

            response.status(200).json({
                message: 'Estado da vaga encontrado',
                data: state
            });
        } catch (error) {
            if (error.code === 'E_RECORD_NOT_FOUND') {
                response.status(404).json({
                    message: 'Estado da vaga não encontrado'
                });
            } else {
                console.error(error); // Registrar o erro no console
                response.status(500).json({
                    message: 'Erro ao exibir estado das vagas',
                    error: error.message
                });
            }
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['name', 'cpf', 'priority_id'])

            const state = await State.create(data)

            return response.created(state)
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao cadastrar estado da vaga' })
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const data = request.only(['name'])

            const state = await State.findOrFail(params.id)
            state.merge(data)
            await state.save()

            return response.ok(state)
        } catch (error) {
            return response.badRequest({ message: 'Erro ao atualizar estado da vaga' })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            // Buscar o usuário pelo ID
            const state = await State.findOrFail(params.id)

            // Excluir o usuário
            await state.delete()

            // Retornar a resposta de sucesso
            return response.noContent()
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao excluir estado da caga' })
        }
    }
}
