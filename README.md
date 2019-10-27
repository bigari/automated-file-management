# automated-file-management

To run the frontend alone in a docker container

```
cd frontend
docker build -t afm-frontend .
docker run -it --name afm-frontend -v .:/app -p 3000:3000

```

To run the backend alone in a docker container

```
cd backend
docker build -t afm-backend .
docker run -it --name afm-backend -v .:/app -p 3000:3000

```

To run the whole app in dev mode

```
sudo chmod +x run.sh
./run.sh -d

```

To build and run the whole app in prod mode

```
sudo chmod +x run.sh
./run.sh -p

```