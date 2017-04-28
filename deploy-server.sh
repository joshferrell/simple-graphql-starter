#/bin/sh

set -e

SERVER_NAME=$1
PORT=$2
VERSION_POSTFIX=$3

CONTAINER_NAME=$SERVER_NAME-steam-$PORT
IMAGE_NAME=steam-server-$(date +%Y-%m-%d)$VERSION_POSTFIX

if [[ ! $SERVER_NAME || ! $PORT ]]; then
    echo 'error: missing command line args'
    exit 1
fi

echo 'pulling changes'
git fetch && git pull

echo 'Stopping and removing: '$CONTAINER_NAME
set +e
sudo docker stop $CONTAINER_NAME
sudo docker rm $CONTAINER_NAME
set -e

echo 'Building: '$IMAGE_NAME
sudo docker build -t $IMAGE_NAME .

echo 'Running: '$CONTAINER_NAME
sudo docker run -d \
  --name $CONTAINER_NAME \
  -e NAME=$CONTAINER_NAME \
  -e COMMIT_DATE="$COMMIT_DATE" \
  -e COMMIT_HASH=$COMMIT_HASH \
  -e PORT=$PORT \
  -e POSTGRES_HOST="postgres-graph-ql" \
  -p $PORT:$PORT \
  --env-file=build.env \
  --link postgres-graph-ql:postgres \
  $IMAGE_NAME

sudo docker ps -a

echo "================="
echo Ran $CONTAINER_NAME from $IMAGE_NAME
echo "================="
