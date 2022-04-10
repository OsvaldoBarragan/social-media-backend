#!/bin/bash

API="http://localhost:4000"
URL_PATH="/users"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
