import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vacancy from '../../Models/Vacancy'

export default class VacanciesController {
  // List vacancies
  public async index({ response }: HttpContextContract) {
    try {
      const vacancies = await Vacancy.all()
      response.status(200).json({
        message: 'Vagas listadas com sucesso',
        data: vacancies
      })
    } catch (error) {
      response.status(500).json({
        message: 'Erro ao listar vacancies',
        error: error.message
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const vacacieId = parseInt(params.id);
      const vacancie = await Vacancy.findOrFail(vacacieId);

      response.status(200).json({
        message: 'Vehicle found',
        data: vacancie
      });
    } catch (error) {
      if (error.code === 'E_RECORD_NOT_FOUND') {
        response.status(404).json({
          message: 'Vaga não encontrada'
        });
      } else {
        console.error(error); 
        response.status(500).json({
          message: 'Error fetching vehicle data',
          error: error.message
        });
      }
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['description', 'latitude', 'longitude']);

      const vacancie = await Vacancy.create(data)

      return response.created(vacancie)
    } catch (error) {
      
      return response.badRequest({ message: 'Erro ao criar vaga' })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.only(['description', 'latitude', 'longitude']);

      const vacancie = await Vacancy.findOrFail(params.id)
      vacancie.merge(data)
      await vacancie.save()

      return response.ok(vacancie)
    } catch (error) {
      return response.badRequest({ message: 'Error updating vacancie' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const vehicle = await Vacancy.findOrFail(params.id)

      await vehicle.delete()

      return response.noContent()
    } catch (error) {
      return response.badRequest({ message: 'Error deleting vacancie' })
    }
  }
}
