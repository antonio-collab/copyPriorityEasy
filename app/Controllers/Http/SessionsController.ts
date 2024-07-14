import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const token = await  auth.attempt(email, password)
    return token
  }
  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
