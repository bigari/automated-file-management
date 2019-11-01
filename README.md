# automated-file-management

## Setup

### Backend 

```bash
mkdir backend/__postgres-data__
```
### Global
```bash
chmod +x run.sh
```

To deploy the app you need to configure it in /backend/.env.prod
## Run

To run the frontend alone in a docker container

```bash
cd frontend
docker build -t afm-frontend .
docker run -it -v $(pwd):/usr/src/app -p 3000:3000 afm-frontend
```

To run the backend alone

```bash
cd backend
docker-compose up
```

To run the whole app in dev mode

```bash
./run.sh -d
```

To build and run the whole app in prod mode

```bash
sudo chmod +x run.sh
./run.sh -p
```
