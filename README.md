# Animes WIKI API

RESTful API and web app for an anime wiki, allowing users to browse animes, seasons, episodes, characters, and their powers/abilities.

## 📖 About the project

**Animes WIKI API** is a structured anime catalog where you can browse:

- Animes and their general data (author, summary, cover image)
- Seasons for each anime
- Episodes for each season
- Characters linked to each anime
- Powers/abilities for each character, including the level of that specific ability for that specific character

This is a monorepo containing both the **backend** (API) and the **frontend** (web client).

## 🛠️ Tech stack

**Backend**

- **[Node.js](https://nodejs.org/)** — runtime environment
- **[Express](https://expressjs.com/)** — web/HTTP framework
- **[PostgreSQL](https://www.postgresql.org/)** — relational database
- **[Prisma](https://www.prisma.io/)** — ORM and migration manager

**Frontend**

- **[Next.js](https://nextjs.org/)** — React framework

**Infrastructure**

- **[Docker](https://www.docker.com/)** / **[Docker Compose](https://docs.docker.com/compose/)** — containerized environment for running the whole stack

## 🗂️ Entity-Relationship Diagram

![Project ERD](./docs/diagrams/erd.png)

## 📁 Project structure

```
animes-api/
├── backend/
│   ├── prisma/
│   └── src/
├── frontend/
│   └── ...
├── docs/
│   └── diagrams/
│       └── erd.png
├── docker-compose.yml
└── README.md
```

## 🚀 Running the project locally

The project runs entirely through Docker — no need to install Node.js, PostgreSQL, or any dependency manually.

### Prerequisites

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Step by step

1. **Clone the repository**

    ```bash
    git clone https://github.com/arlops22/animes-api.git
    cd animes-api
    ```

2. **Set up environment variables**

    Create a `.env` file inside `backend/` with the database connection string:

    ```env
    DATABASE_URL="postgresql://root:root@postgresql:5432/anime_wiki"
    ```

    > Note: the host `postgresql` refers to the PostgreSQL service name defined in `docker-compose.yml`, not `localhost` — this is how containers reach each other on the same Docker network.

3. **Start the containers**

    ```bash
    docker compose up -d
    ```

    This spins up the backend, frontend, and PostgreSQL database.

4. **Access the app**
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000`

5. **Stopping the containers**

    ```bash
    docker compose down
    ```

## 🧪 Tests

```bash
docker exec -it anime_wiki_api npm run test:unit
docker exec -it anime_wiki_api npm run test:integration
```
