# Quote Generator API

Simple Node.js Express API that returns a random quote.

## Endpoints
- `GET /quote` → `{ "quote": "..." }`
- `GET /health` → `{ "status": "ok" }`
- `GET /` → Guide text

## Local Run
```bash
npm install
npm start
# test
curl http://localhost:3000/quote
```

## Docker
```bash
# build
docker build -t quote-api:local .
# run
docker run -d --name quote-api -p 3000:3000 quote-api:local
# test
curl http://localhost:3000/health
curl http://localhost:3000/quote
```

## Docker Hub (optional)
```bash
# login
docker login
# set username environment variable (e.g., export DOCKER_USER=myid)
docker tag quote-api:local $DOCKER_USER/quote-generator-api:v1
docker push $DOCKER_USER/quote-generator-api:v1
# run (on another machine)
docker run -p 3000:3000 $DOCKER_USER/quote-generator-api:v1
```

## Notes
- Default port is 3000, can be changed with PORT environment variable
- Only express dependency is used