FROM ubuntu:latest
LABEL authors="trive"

ENTRYPOINT ["top", "-b"]

# Build Stage
FROM maven:3.8.7-openjdk-18 AS build

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

# Define the runtime argument (if you want to use it in the runtime as well) 
# This is for the runtime environment
# define few things
ARG PROFILE=dev
ARG APP_VERSION=1.0.1

# create seperate directory in server
WORKDIR /app
# copy build files from repo to /build/app folder on server
COPY --from=build /build/target/book-network-*.jar /app/trial.jar

# Extract the JAR version
# RUN APP_VERSION=$(ls /app | grep *.jar | awk 'NR==2{split($0,a,"-"); print a[3]}' | awk '{sub(/.jar$/,"")}1')\
#     && echo "Building container with BSN v-$version"

EXPOSE 8088

# Set DB_URL at runtime so the app can use it
ENV DB_URL=jdbc:postgresql://host.docker.internal:5440/book_social_network
# Now, this is available when the container is running
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} trial.jar
