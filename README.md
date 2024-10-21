# Descripción

Plataforma web  Tipo Airbnb en Next.js



## Correr en dev

    # Fast Instructions:

        1. Clonar el repositorio.
        2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
        3. Instalar dependencias ```npm install```
        4.Levantar la base de datos ```docker compose up -d```
        5.Correr las migraciones de Primsa ```npx prisma migrate dev```
        6. Ejecutar seed ```npm run seed``` (no tiene ordenes creadas)
        7. Correr el proyecto ```npm run dev```.
        8. Limpiar el localStorage del navegador.

# Instrucciones detalladas:

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Preparar la base de datos:
    4.1 npm i -D prisma.
    4.2 npx prisma init
    en schema.prisma cambiar postgress por mongodb
    en .env configurar mongodb URL de los datos crados en tu projecto en ```mongo.altas.com``` ```importante agregrar /test al final de a URL para que prisma lo pueda aceptar ```
    4.3 luego de crear los modelos en schema.prisma se debe hacer
    ```npx prisma db push``` esto empuja los modelos a ongo atlas.
    4.4 hacer ```npm install next-auth @prisma/client @next-auth/prisma-adapter``` parac onfigurar NextAuth.js y usar Prisma Adapter.
    4.5 ``` npm i bcrypt   ``` y ```npm install -D @types/bcrypt``` para nuestro uso personal y credenciales de encript login
    4.4 generar el archivo prismadb.ts para buenas practicas de Next y evitar multiples instacias de prima client en development



