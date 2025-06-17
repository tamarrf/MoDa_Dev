#!/bin/bash
cd ../
docker compose down
cd -
rm -rf ./runtime/data/mysql/*
rm -rf ./runtime/logs/apache2/*
rm -rf ./runtime/logs/mysql/*
rm -rf ./runtime/logs/craft/*
cd ../
docker compose up -d --build