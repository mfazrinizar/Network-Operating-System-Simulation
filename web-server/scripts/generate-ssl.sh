#!/bin/bash

# Base directories
CERT_DIR="/etc/nginx/ssl"
DOMAIN_LIST=("api.mfazrinizar.com" "db.mfazrinizar.com" "mfazrinizar.com")
ROOT_CA="${CERT_DIR}/rootCA.pem"

# Ensure the SSL directory exists
mkdir -p $CERT_DIR

# Generate the root CA if not already present
if [ ! -f "$ROOT_CA" ]; then
  echo "Generating Root CA..."
  openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout "${CERT_DIR}/rootCA.key" \
    -out "$ROOT_CA" \
    -subj "/C=US/ST=Example/L=Example/O=Example/CN=RootCA"
fi

# Generate certificates for each domain
for DOMAIN in "${DOMAIN_LIST[@]}"; do
  echo "Generating SSL certificates for $DOMAIN..."

  # Generate private key
  openssl genrsa -out "${CERT_DIR}/${DOMAIN}.key" 2048

  # Generate certificate signing request
  openssl req -new -key "${CERT_DIR}/${DOMAIN}.key" \
    -out "${CERT_DIR}/${DOMAIN}.csr" \
    -subj "/C=ID/ST=Example/L=Example/O=Example/CN=${DOMAIN}"

  # Generate the certificate
  openssl x509 -req -days 365 -in "${CERT_DIR}/${DOMAIN}.csr" \
    -CA "$ROOT_CA" -CAkey "${CERT_DIR}/rootCA.key" -CAcreateserial \
    -out "${CERT_DIR}/${DOMAIN}.crt"

  echo "Certificate for $DOMAIN created successfully!"
done
