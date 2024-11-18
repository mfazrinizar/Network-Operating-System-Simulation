server {
    listen 443 ssl;
    server_name mfazrinizar.com;

    ssl_certificate /etc/nginx/ssl/mfazrinizar.com.crt;
    ssl_certificate_key /etc/nginx/ssl/mfazrinizar.com.key;

    location / {
        proxy_pass http://192.168.8.40:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name mfazrinizar.com;
    return 301 https://$host$request_uri;
}
