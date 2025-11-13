# TestProject

Веб-приложение с серверной частью на NestJS и клиентской частью на Next.js.
Приложение использует PostgreSQL и pgAdmin, контейнеризовано через Docker Compose.

# Стек технологий:

Backend: NestJS, TypeORM, PostgreSQL
Frontend: Next.js, React Hook Form, Tailwind CSS
Инфраструктура: Docker, Docker Compose, pgAdmin

# Запуск в режиме разработки (без Docker)

## Backend-сервер (Nest js):

### Перейдите в директорию backend_test-project:

cd backend_test-project

### Установите зависимости:

npm install

### Создайте файл .env:

cp .env.example .env

### Запустите локально PostgreSQL или поднимите контейнер

HOST_DB=db  
PORT_DB=5432  
USERNAME_DB=postgres  
PASSWORD_DB=postgres  
DATABASE_DB=auth_db

### Запустите сервер:

npm run start:dev

### Backend будет доступен по адресу:

http://localhost:5000

## Frontend-сервер (Next js)

### Перейдите в директорию frontend_test-project:

cd frontend_test-project

### Установите зависимости:

npm install

### Запустите приложение:

npm run dev

### Frontend будет доступен по адресу:

http://localhost:3000

# Запуск через Docker Compose

### В корне проекта выполните команду:

docker compose up --build

### После сборки сервисы будут доступны по адресам:

Frontend: http://localhost:3000
Backend: http://localhost:5000
PgAdmin: http://localhost:5050
email: admin@admin.com
password: pgadmin4

### Параметры подключения к базе данных:

HOST_DB=db
PORT_DB=5432
USERNAME_DB=postgres
PASSWORD_DB=postgres
DATABASE_DB=auth_db

### Остановка контейнеров:

docker compose down
