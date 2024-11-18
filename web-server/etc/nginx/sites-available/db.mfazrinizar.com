server {
    listen 443 ssl;
    server_name db.mfazrinizar.com;

    ssl_certificate /etc/nginx/ssl/db.mfazrinizar.com.crt;
    ssl_certificate_key /etc/nginx/ssl/db.mfazrinizar.com.key;

    location / {
        proxy_pass http://192.168.8.40:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name db.mfazrinizar.com;
    return 301 https://$host$request_uri;
}
