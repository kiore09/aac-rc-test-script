FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
VOLUME /tmp
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy
VOLUME /tmp
COPY --from=build /home/app/target/{{ cookiecutter.name }}-0.0.1-SNAPSHOT.jar app.jar

# When running the app via "java -jar ...", JVM arguments in the pom.xml are not used
# so they must be fed into the command itself:
# ENTRYPOINT ["java","-Xmx2048m","-Xdebug","-DargumentName=someValue","-jar","app.jar"]
ENTRYPOINT ["java","-jar","app.jar"]
