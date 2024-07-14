import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressController {
    //Lista de endereços
    public async index({ response }: HttpContextContract) {
        try {
            const address = await Address.all()
            response.status(200).json({
                message: ' Prioridadades listadadas com sucesso',
                data: address
            })
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao listar endereço',
                error: error.message
            })
        }
    }
    public async show({ params, response }: HttpContextContract) {
        try {
            const addressId = parseInt(params.id);
            const address = await Address.findOrFail(addressId);

            response.status(200).json({
                message: 'Endereço encontrado',
                data: address
            });
        } catch (error) {
            if (error.code === 'E_RECORD_NOT_FOUND') {
                response.status(404).json({
                    message: 'Endereço não encontrado'
                });
            } else {
                console.error(error); // Registrar o erro no console
                response.status(500).json({
                    message: 'Erro ao exibir endereço',
                    error: error.message
                });
            }
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['street', 'number', 'district', 'zipCode', 'city', 'stateId', 'userId'])

            const address = await Address.create(data)

            return response.created(address)
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao cadastrar endereço' })
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const data = request.only(['street', 'number', 'district', 'zipCode', 'city', 'stateId', 'userId'])

            const address = await Address.findOrFail(params.id)
            address.merge(data)
            await address.save()

            return response.ok(address)
        } catch (error) {
            return response.badRequest({ message: 'Erro ao atualizar endereço' })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            // Buscar o usuário pelo ID
            const address = await Address.findOrFail(params.id)

            // Excluir o usuário
            await address.delete()

            // Retornar a resposta de sucesso
            return response.noContent()
        } catch (error) {
            // Retornar a resposta de erro em caso de falha
            return response.badRequest({ message: 'Erro ao excluir endereço' })
        }
    }
}
