import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/naissu', async (c) => {
  let { results } = await c.env.DB.prepare('SELECT * FROM naissu').all()
  return c.json(results)
})

app.post('/api/naissu', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO events(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  const newNaiss = await c.env.DB.exec(query)
  return c.json(newNaiss)
})

app.get('/api/naissu/:id', async (c) => {
  const eventId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM naissu WHERE id = ?').bind(eventId).all()
  return c.json(results[0])
})

app.put('/api/naissu/:id', async (c) => {
  const eventId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE events SET name = "${input.name}", place = "${input.place}", time = ${input.time} WHERE id = "${eventId}"`
  const naiss = await c.env.DB.exec(query)

  return c.json(naiss)
})

app.delete('/api/naissu/:id', async (c) => {
  const naissId = c.req.param('id')

  const query = `DELETE FROM events WHERE id = "${naissId}"`
  const naiss = await c.env.DB.exec(query)

  return c.json(naiss)
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
