#!/bin/bash

# Create Docker volumes for InfluxDB & Grafana
docker volume create influxdb-volume
docker volume create grafana-volume

# Create Docker network for InfluxDB & Grafana
docker network create monitoring_network

echo "Docker volumes and network created successfully."