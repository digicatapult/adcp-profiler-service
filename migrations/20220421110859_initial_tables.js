exports.up = async (knex) => {
  // check extension is not installed
  const [extInstalled] = await knex('pg_extension').select('*').where({ extname: 'uuid-ossp' })
  if (!extInstalled) {
    await knex.raw('CREATE EXTENSION "uuid-ossp"')
  }

  const uuidGenerateV4 = () => knex.raw('uuid_generate_v4()')
  const now = () => knex.fn.now()

  await knex.schema.createTable('clients', (def) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.string('first_name', 50).notNullable()
    def.string('last_name', 50).notNullable()
    def.string('company', 50).notNullable()
    def.string('role', 50).notNullable()

    def.primary(['id'])
  })

  await knex.schema.createTable('projects', (def) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.uuid('client_id').notNullable()
    def.string('name', 50).unique().notNullable()
    def.string('description', 50).notNullable()
    def.datetime('start_date')
    def.datetime('end_date')
    def.float('budget')
    def.string('documents_path', 100)
    def.datetime('created_at').notNullable().default(now())
    def.datetime('updated_at').notNullable().default(now())

    def.primary(['id'])
    def.foreign('client_id').references('id').on('clients')
  })

  await knex.schema.createTable('project_services', (def) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.uuid('project_id').notNullable()

    def.primary(['id'])
    def.foreign('project_id').references('id').on('projects').onDelete('CASCADE').onUpdate('CASCADE')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('project_services')
  await knex.schema.dropTable('projects')
  await knex.schema.dropTable('clients')
  await knex.raw('DROP EXTENSION "uuid-ossp"')
}
