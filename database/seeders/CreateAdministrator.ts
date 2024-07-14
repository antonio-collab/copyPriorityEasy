import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Administrator from 'App/Models/Administrator'

export default class extends BaseSeeder {
  public async run() {
    await Administrator.create({
      name: 'Abílio Soares Coelho',
      email: 'abiliocoelho@gmail.com',
      password: 'secret',
    })
  }
}
