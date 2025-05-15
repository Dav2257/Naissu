interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
    async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/naissu")) {
    
        if (request.method == 'GET') {
            let { results } = await env.DB.prepare("SELECT * FROM naissu").all();
            return Response.json(results);
          } else if (request.method == 'POST') {
            const newId = crypto.randomUUID()
            const input = await request.json()
            const query = `INSERT INTO events(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`;
            const newNaiss = await env.DB.exec(query);
            return Response.json(newNaiss);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;