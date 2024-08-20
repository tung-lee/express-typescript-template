sudo apt-get update

sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic test"

sudo apt update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Install mongodb-database-tools
wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2404-x86_64-100.10.0.deb
sudo apt install ./mongodb-database-tools-ubuntu2404-x86_64-100.10.0.deb
rm mongodb-database-tools-ubuntu2404-x86_64-100.10.0.deb

sudo docker run -d -p 80:80 -p 443:443 --name nginx-proxy --privileged=true \
  -e ENABLE_IPV6=true \
  -v ~/nginx/vhost.d:/etc/nginx/vhost.d \
  -v ~/nginx-certs:/etc/nginx/certs:ro \
  -v ~/nginx-conf:/etc/nginx/conf.d \
  -v ~/nginx-logs:/var/log/nginx \
  -v /usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  jwilder/nginx-proxy

sudo docker run -d --privileged=true \
  -v ~/nginx/vhost.d:/etc/nginx/vhost.d \
  -v ~/nginx-certs:/etc/nginx/certs:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --volumes-from nginx-proxy \
  jrcs/letsencrypt-nginx-proxy-companion

# Production
sudo docker run -it -d \
  --name  \
  -e VIRTUAL_HOST="" \
  -e VIRTUAL_PORT=80 \
  -e LETSENCRYPT_HOST="" \
  -e LETSENCRYPT_EMAIL="" \
  -e PRODUCTION_APP_PORT=80 \
  -e PRODUCTION_DB_URL="" \
  -e PRODUCTION_DB_NAME="" \
  -e NODE_ENV="production" \

# Development

sudo docker run -it -d \
  --name  \
  -e VIRTUAL_HOST="" \
  -e VIRTUAL_PORT=80 \
  -e LETSENCRYPT_HOST="" \
  -e LETSENCRYPT_EMAIL="" \
  -e PRODUCTION_APP_PORT=80 \
  -e PRODUCTION_DB_URL="" \
  -e PRODUCTION_DB_NAME="" \
  -e NODE_ENV="production" \