FROM node

RUN mkdir api

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

CMD ["sh", "docker-entrypoint.sh"]