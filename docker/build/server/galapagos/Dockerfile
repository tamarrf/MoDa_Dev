FROM ubuntu:bionic
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt upgrade -y
RUN apt install less wget npm curl gnupg2 openjdk-8-jdk-headless -y
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add
RUN apt update -y
RUN apt install sbt -y
RUN npm install --global yarn
WORKDIR /app

COPY ["galapagos-source/play-scrape-server_2.12", "/app/play-scrape-server_2.12"]
WORKDIR /app
RUN mkdir -p ~/.ivy2/cache/org.nlogo/
RUN mv /app/play-scrape-server_2.12 ~/.ivy2/cache/org.nlogo/play-scrape-server_2.12
EXPOSE 9000

ENTRYPOINT ["sbt", "-J-Xmx2G", "run"]