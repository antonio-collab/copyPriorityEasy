import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Priority from 'App/Models/Priority'

export default class PriorityController {
    //Lista usuários
    public async index({ response }: HttpContextContract) {
        try {
            const priority = await Priority.all()
            response.status(200).json({
                message: ' Prioridadades listadadas com sucesso',
                data: priority
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
            const priorityId = parseInt(params.id);
            const priority = await Priority.findOrFail(priorityId);

            response.status(200).json({
                message: 'Prioridade encontrado',
                data: priority
            });
        } catch (error) {
            if (error.code === 'E_RECORD_NOT_FOUND') {
                response.status(404).json({
                    message: 'Prioridade não encontrada'
                });
            } else {
                console.error(error); // Registrar o erro no console
                response.status(500).json({
                    message: 'Erro ao exibir prioridade',
                    error: error.message
                });
            }
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['name', 'cpf', 'priority_id'])

            const priority = await Priority.create(data)

            return response.created(priority)
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao cadastrar estado da vaga' })
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const data = request.only(['name'])

            const priority = await Priority.findOrFail(params.id)
            priority.merge(data)
            await priority.save()

            return response.ok(priority)
        } catch (error) {
            return response.badRequest({ message: 'Erro ao atualizar prioridade' })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            // Buscar o usuário pelo ID
            const priority = await Priority.findOrFail(params.id)

            // Excluir o usuário
            await priority.delete()

            // Retornar a resposta de sucesso
            return response.noContent()
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao excluir prioridade' })
        }
    }
}
