FROM maven:3-openjdk-17 as build

ENV MAVEN_HOME=/usr/local/maven
ENV PATH $PATH:/usr/local/maven/bin
WORKDIR /app/onyx-institut-backend/

COPY ./pom.xml /app/onyx-institut-backend/pom.xml
COPY ./ /app/onyx-institut-backend/

RUN mvn clean package -DskipTests

FROM openjdk:17

VOLUME /tmp
COPY --from=build /app/onyx-institut-backend/target/onyx-institut-backend-0.0.1-SNAPSHOT.jar /app/onyx-institut-backend/target/
EXPOSE 8081

CMD ["java", "-jar", "/app/onyx-institut-backend/target/onyx-institut-backend-0.0.1-SNAPSHOT.jar"]