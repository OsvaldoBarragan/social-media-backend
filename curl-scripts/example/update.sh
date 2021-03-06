#!/bin/bash

API="http://localhost:4000"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "example": {
        "text": "'"${TEXT}"'",
        "title": "'"${TITLE}"'"
      }
    }'

echo
