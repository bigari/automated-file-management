# automated-file-management

## Setup

### Backend

```bash
cd backend
touch .env
cat .env.example > .env
```
Then fill the blank by your specific configuration.
Changing the preset variables could lead to docker misconfiguration.

## Run

To run the frontend alone in a docker container

```bash
cd frontend
docker build -t afm-frontend .
docker run -it --name afm-frontend -v $(pwd):/app -p 3000:3000

```

To run the backend alone in a docker container

```bash
cd backend
docker build -t afm-backend .
docker run -it --name afm-backend -v $(pwd):/app -p 5002:5002
```

To run the whole app in dev mode

```bash
sudo chmod +x run.sh
./run.sh -d
```

To build and run the whole app in prod mode

```bash
sudo chmod +x run.sh
./run.sh -p
```