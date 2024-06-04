# Usar una imagen base de Node.js
FROM node:lts

# Establecer un directorio de trabajo para la aplicación
WORKDIR /app

# Copiar los archivos de descripción de paquetes de Node.js
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto para la aplicación Node.js
EXPOSE 3000

# Instalar Postfix para el servidor SMTP
RUN apt-get update && \
    apt-get install -y postfix

# Configurar Postfix
RUN echo "relayhost = [smtp.develop.com]" >> /etc/postfix/main.cf && \
    echo "myhostname = develop.com" >> /etc/postfix/main.cf && \
    echo "mydestination = $myhostname, localhost.$mydomain, localhost" >> /etc/postfix/main.cf && \
    echo "mynetworks = 172.22.0.0/16" >> /etc/postfix/main.cf && \
    echo "inet_interfaces = all" >> /etc/postfix/main.cf

# Exponer el puerto para el servidor SMTP
EXPOSE 25

# Comando por defecto para iniciar la aplicación Node.js y Postfix
CMD service postfix start && npm run dev
