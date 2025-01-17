FROM ubuntu:latest
LABEL authors="trive"

ENTRYPOINT ["top", "-b"]

# Build Stage
FROM maven:3.8.7-openjdk-18 AS build

# # Define the build-time argument
# ARG DB_URL

# # Set the DB_URL environment variable for Maven to use during build
# ENV DB_URL=${DB_URL}

# Creating folder on the server machine to dump code into it
WORKDIR /build
# 1st copy com.xml file into it
COPY pom.xml .

RUN mvn dependency:go-offline
# then copy src folder from repo and dump it's files into /build/src on server
COPY src ./src
# Create packaging of our application
RUN mvn clean package -DSkipTests


# RunTime Stage
# downloading JDK 1st to run any java application
FROM amazoncorretto:17

# # Copy the wait-for-it.sh script into the container
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# Define the runtime argument (if you want to use it in the runtime as well) 
# This is for the runtime environment
# define few things
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

# create seperate directory in server
WORKDIR /app
# copy build files from repo to /build/app folder on server
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088

# Set DB_URL at runtime so the app can use it
ARG URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV DB_URL=${URL}
# Now, this is available when the container is running
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

ARG USERNAME=username
ARG PASSWORD=password
ENV USER=${USERNAME}
ENV PWD=${PASSWORD}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} -DSpring.datasource.username=${USER} -DSpring.datasource.password=${PWD} book-network-${JAR_VERSION}.jar



# Prshant Section

# FROM dvmarques/openjdk-17-jdk-alpine-with-timezone
# FROM docker.io/openjdk:17-alpine
# FROM maven:3.8.7-openjdk-18 AS build

# USER root
# WORKDIR /app

# Install Maven in the container
# RUN apk add --no-cache maven

# COPY . .

# RUN chmod +x ./mvnw
# RUN ./mvnw clean package

# RUN adduser --uid 10101 -S book_social_network_test && \
#     chown -R 10101 /app

# # The application's jar file
# ARG JAR_FILE=target/book-network-*.jar

# # Add the application's jar to the container
# COPY ${JAR_FILE} book_social_network_test_container.jar

# USER 10101
# EXPOSE 8080

# ENTRYPOINT ["java", "-jar", "/app/book_social_network_test_container.jar" ]











# # Stage 1: Build the project using Maven
# FROM maven:3.8.7-openjdk-18 AS build

# WORKDIR /app

# # Copy the entire project into the container
# COPY . .

# RUN sed -i 's/\r//' mvnw

# # Build the application using Maven
# RUN ./mvnw clean package

# # Stage 2: Run the application using OpenJDK
# FROM openjdk:17-alpine

# USER root
# WORKDIR /app

# # Copy the built JAR file from the build stage
# COPY --from=build /app/target/book-network-*.jar book_social_network_test_container.jar

# # Create a user to run the app
# RUN adduser --uid 10101 -S book_social_network_test && \
#     chown -R 10101 /app

# # Switch to the non-root user for security reasons
# USER 10101

# # Expose the application port
# EXPOSE 8080

# # Define the entrypoint to run the JAR file
# ENTRYPOINT ["java", "-jar", "/app/book_social_network_test_container.jar"]
