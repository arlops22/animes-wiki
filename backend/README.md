# Animes WIKI API

RESTful API for an anime wiki, allowing users to search animes, seasons, episodes, characters.

## 📖 About the project

**Animes WIKI API** is a structured anime catalog where you can browse:

- Animes and their general data (author, summary, cover image)

- Seasons for each anime

- Episodes for each season

- Characters linked to each anime

- Powers/abilities for each character, including the level of that specific ability for that specific character

## 🛠️ Tech stack

- **[Node.js](https://nodejs.org/)** — runtime environment

- **[Express](https://expressjs.com/)** — web/HTTP framework

- **[PostgreSQL](https://www.postgresql.org/)** — relational database

- **[Prisma](https://www.prisma.io/)** — ORM and migration manager

## 🗂️ Entity-Relationship Diagram

![Project ERD](./docs/diagrams/erd.png)

## 🚀 Running the project locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

- [PostgreSQL](https://www.postgresql.org/) installed and running

- [npm](https://www.npmjs.com/)

### Step by step

1. **Clone the repository**

    ```bash
    git clone https://github.com/arlops22/animes-api.git
    cd animes-api
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the server**

    ```bash
    npm run dev
    ```

    The API will be available at `http://localhost:3000`.

## 🧪 Tests

```bash
npm test
```
