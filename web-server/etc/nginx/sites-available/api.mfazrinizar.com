server {
    listen 443 ssl;
    server_name api.mfazrinizar.com;

    ssl_certificate /etc/nginx/ssl/api.mfazrinizar.com.crt;
    ssl_certificate_key /etc/nginx/ssl/api.mfazrinizar.com.key;
    ssl_trusted_certificate /etc/nginx/ssl/rootCA.pem;

    location / {
        proxy_pass http://192.168.8.40:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 80;
    server_name api.mfazrinizar.com;
    return 301 https://$host$request_uri;
}
