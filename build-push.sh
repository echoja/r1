#!/bin/bash

function run_build_push() {
    echo "build and push version $1.."
    sudo docker build -t eszqsc112/research-s:latest -t eszqsc112/research-s:"$1" .
    sudo docker push eszqsc112/research-s:latest
    sudo docker push eszqsc112/research-s:"$1"
    echo "build-push.sh complete!"
}

if [[ -z "$1" ]]; then
  echo "Usage example: ./build-push 0.1.2"
else
  run_build_push $1
fi


