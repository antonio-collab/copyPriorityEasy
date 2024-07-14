import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    //Lista usuários
    public async index({ response }: HttpContextContract) {
        try {
            const users = await User.all()
            response.status(200).json({
                message: 'Usuários listados com sucesso',
                data: users
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
            const userId = parseInt(params.id);
            const user = await User.findOrFail(userId);

            response.status(200).json({
                message: 'Usuário encontrado',
                data: user
            });
        } catch (error) {
            if (error.code === 'E_RECORD_NOT_FOUND') {
                response.status(404).json({
                    message: 'Usuário não encontrado'
                });
            } else {
                console.error(error); // Registrar o erro no console
                response.status(500).json({
                    message: 'Erro ao exibir usuário',
                    error: error.message
                });
            }
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['name', 'cpf', 'priority_id'])

            const user = await User.create(data)

            return response.created(user)
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao cadastrar usuário' })
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const data = request.only(['name', 'cpf', 'priority_id'])

            const user = await User.findOrFail(params.id)
            user.merge(data)
            await user.save()

            return response.ok(user)
        } catch (error) {
            return response.badRequest({ message: 'Erro ao atualizar usuário' })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            // Buscar o usuário pelo ID
            const user = await User.findOrFail(params.id)

            // Excluir o usuário
            await user.delete()

            // Retornar a resposta de sucesso
            return response.noContent()
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao excluir usuário' })
        }
    }
}
