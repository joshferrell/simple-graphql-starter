#/bin/sh

set -e

SERVER_NAME=$1
PORT=$2
VERSION_POSTFIX=$3
POSTGRES_NAME="postgres-graph-ql"

CONTAINER_NAME=$SERVER_NAME-steam-$PORT
IMAGE_NAME=steam-server-$PORT

if [[ ! $SERVER_NAME || ! $PORT ]]; then
    echo 'error: missing command line args'
    exit 1
fi

echo 'pulling changes'
git fetch && git pull

echo 'Stopping and removing: '$CONTAINER_NAME
set +e
hyper stop $CONTAINER_NAME
hyper rm $CONTAINER_NAME
hyper rmi $CONTAINER_NAME
set -e

echo 'Stopping and removing: '$POSTGRES_NAME
set +e
hyper stop $POSTGRES_NAME
hyper rm $POSTGRES_NAME
hyper rmi postgres
set -e

echo 'Building: '$IMAGE_NAME
docker build -t $IMAGE_NAME .
docker tag $IMAGE_NAME $DOCKER_ID_USER/$IMAGE_NAME
docker push $DOCKER_ID_USER/$IMAGE_NAME

hyper run -d \
    --name $POSTGRES_NAME \
    --env-file=build.env \
    --hostname=$POSTGRES_NAME \
    -P \
    postgres

echo 'Running: '$CONTAINER_NAME
hyper run -d \
  --name $CONTAINER_NAME \
  -e NAME=$CONTAINER_NAME \
  -e COMMIT_DATE="$COMMIT_DATE" \
  -e COMMIT_HASH=$COMMIT_HASH \
  -e PORT=$PORT \
  -e POSTGRES_HOST=$POSTGRES_NAME \
  -P \
  --env-file=build.env \
  --link $POSTGRES_NAME:postgres \
  $DOCKER_ID_USER/$IMAGE_NAME

hyper ps -a

echo "================="
echo Ran $CONTAINER_NAME from $IMAGE_NAME
echo "================="
