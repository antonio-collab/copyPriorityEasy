import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from '../../Models/Vehicle'

export default class VehiclesController {
  // List vehicles
  public async index({ response }: HttpContextContract) {
    try {
      const vehicles = await Vehicle.all()
      response.status(200).json({
        message: 'Vehicles listed successfully',
        data: vehicles
      })
    } catch (error) {
      response.status(500).json({
        message: 'Error listing vehicles',
        error: error.message
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const vehicleId = parseInt(params.id);
      const vehicle = await Vehicle.findOrFail(vehicleId);

      response.status(200).json({
        message: 'Vehicle found',
        data: vehicle
      });
    } catch (error) {
      if (error.code === 'E_RECORD_NOT_FOUND') {
        response.status(404).json({
          message: 'Vehicle not found'
        });
      } else {
        console.error(error); // Log the error for debugging
        response.status(500).json({
          message: 'Error fetching vehicle data',
          error: error.message
        });
      }
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['model', 'plate', 'brand']);

      const vehicle = await Vehicle.create(data)

      return response.created(vehicle)
    } catch (error) {
      // Return a bad request error message
      return response.badRequest({ message: 'Error creating vehicle' })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.only(['model', 'plate', 'brand']);

      const vehicle = await Vehicle.findOrFail(params.id)
      vehicle.merge(data)
      await vehicle.save()

      return response.ok(vehicle)
    } catch (error) {
      return response.badRequest({ message: 'Error updating vehicle' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const vehicle = await Vehicle.findOrFail(params.id)

      await vehicle.delete()

      return response.noContent()
    } catch (error) {
      return response.badRequest({ message: 'Error deleting vehicle' })
    }
  }
}
