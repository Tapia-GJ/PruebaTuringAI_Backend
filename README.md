# TuringAI Backend - Catálogo de Cómics

API RESTful para la gestión de un catálogo de cómics, desarrollada con Express 5, TypeScript, Prisma ORM y Better Auth para una autenticación robusta y segura.

## 🚀 Stack Tecnológico

- **Entorno de ejecución**: Node.js
- **Gestor de paquetes**: pnpm
- **Framework**: Express (v5)
- **Lenguaje**: TypeScript
- **ORM / Base de Datos**: Prisma (v7) + MySQL/MariaDB
- **Autenticación**: Better Auth

## 📋 Requisitos del Sistema

Antes de empezar, asegurate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) (v22 o superior recomendado)
- [pnpm](https://pnpm.io/installation) (v10 o superior)
- Un motor de base de datos MySQL o MariaDB corriendo localmente o en la nube.

## 🛠️ Instalación y Configuración Local

Sigue estos pasos al pie de la letra para levantar el entorno de desarrollo:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tapia-GJ/PruebaTuringAI_Backend.git
cd PruebaTuringAI_Backend
```

### 2. Instalar dependencias

Usa EXCLUSIVAMENTE `pnpm` para instalar las dependencias, asegurando la consistencia del árbol de paquetes:

```bash
pnpm install
```

### 3. Variables de Entorno

Copia el archivo de ejemplo de variables de entorno y renómbralo a `.env`:

```bash
cp .env.example .env
```

Abre el archivo `.env` recién creado y ajusta los valores (especialmente las credenciales de la base de datos `DATABASE_URL` y los secretos de autenticación).

> **Importante:** El `BETTER_AUTH_SECRET` debe ser un string criptográfico seguro de al menos 32 caracteres. Puedes generar uno ejecutando `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.

### 4. Configuración de la Base de Datos

Una vez que tengas tu motor MySQL corriendo y el `.env` configurado, sincroniza el esquema de Prisma con la base de datos:

```bash
pnpm exec prisma migrate dev
```

_Este comando creará las tablas necesarias en la base de datos._

A continuación, ejecuta el **Seed** para poblar la base de datos con los datos estructurales obligatorios (ej. Roles de usuario `USER` y `ADMIN`):

```bash
pnpm exec prisma db seed
```

## 💻 Ejecución del Proyecto

Para iniciar el servidor en modo desarrollo (con hot-reload activado mediante `tsx`):

```bash
pnpm dev
```

El servidor arrancará por defecto en `http://localhost:3000`.

## 🔐 Endpoints Principales (Autenticación)

El sistema utiliza **Better Auth**, por lo que los endpoints de autenticación están auto-generados bajo la ruta `/api/auth/*`.

- **Registro**: `POST /api/auth/sign-up/email`
  - Body (JSON): `{ "email": "test@test.com", "password": "securepassword", "name": "Test User" }`
- **Login**: `POST /api/auth/sign-in/email`
  - Body (JSON): `{ "email": "test@test.com", "password": "securepassword" }`
- **Sesión actual**: `GET /api/auth/get-session`

---

_Documentación mantenida para asegurar un onboarding limpio y rápido._
