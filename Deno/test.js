import { serve } from 'https://deno.land/std@v0.42.0/http/server.ts';

const server = serve({ prot: 8000 });

console.log('http://localhost:8000');

for await (const req of server) {
  req.respond({ body: 'Hello World!' });
}
