# Stage 1: Build con Maven
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
# Copiamos la subcarpeta del código fuente según tu imagen
COPY Springboot-API-REST-DESPACHO/ . 
RUN mvn clean package -DskipTests

# Stage 2: Runtime optimizado
FROM openjdk:17-jdk-alpine
WORKDIR /app
# IE1: Configuración de usuario sin privilegios (cite: 91, 202)
RUN addgroup -S springgroup && adduser -S springuser -G springgroup
USER springuser
# Copia del artefacto compilado
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]