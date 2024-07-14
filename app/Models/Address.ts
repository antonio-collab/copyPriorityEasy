import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import State from './State'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public district: string

  @column()
  public zipCode: string

  @column()
  public city: string

  @column()
  public stateId: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacionamento com a tabela de usuários
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Relacionamento com a tabela de estados
  @belongsTo(() => State)
  public state: BelongsTo<typeof State>
}