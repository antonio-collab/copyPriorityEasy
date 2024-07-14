import Route from '@ioc:Adonis/Core/Route'

Route.post('session', 'SessionsController.store')

Route.group(() => {
Route.delete('session', 'SessionsController.destroy')
Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.post('/users', 'UsersController.store')
Route.put('/users/:id', 'UsersController.update')
Route.delete('/users/:id', 'UsersController.destroy')

Route.get('/vehicles', 'VehiclesController.index')
Route.get('/vehicles/:id', 'VehiclesController.show')
Route.post('/vehicles', 'VehiclesController.store')
Route.put('/vehicles/:id', 'VehiclesController.update')
Route.delete('/vehicles/:id', 'VehiclesController.destroy')

Route.get('/priority','PrioritiesController.index')
Route.get('/priority/:id', 'PrioritiesController.show')
Route.post('/priority','PrioritiesController.store')
Route.put('/priority/:id','PrioritiesController.update')
Route.delete('/priority/:id','PrioritiesController.destroy')



Route.get('/address','AddressesController.index')
Route.get('/address/:id','AddressesController.show')
Route.post('/address','AddressesController.store')
Route.put('/address/:id','AddressesController.update')
Route.delete('/address/:id','AddressesController.destroy')
}).middleware('auth')

Route.group(()=>{
  
Route.get('/vecancies', 'VacanciesController.index')
Route.get('/vecancies/:id', 'VacanciesController.show')
Route.post('/vecancies', 'VacanciesController.store')
Route.put('/vecancies/:id', 'VacanciesController.update')
Route.delete('/vecancies/:id', 'VacanciesController.destroy')

Route.post('/admin', 'AdministratorController.store')
Route.get('/admin/:id', 'AdministratorController.show')
Route.put('/admin/:id', 'AdministratorController.update')
Route.delete('/admin/:id', 'AdministratorController.destroy')
}).middleware('auth')


Route.post('admin/login', 'SessionsController.store')


Route.get('/states', 'StatesController.index')
Route.get('/states/:id', 'StatesController.show')
Route.post('/states', 'StatesController.store')
Route.put('/states/:id', 'StatesController.update')
Route.delete('/states/:id', 'StatesController.destroy')
