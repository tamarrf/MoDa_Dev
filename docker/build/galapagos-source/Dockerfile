FROM smartkit/scala-sbt-nodejs:2.12.2-0.13.16-6
#Java 8, Scala 2.11 & Sbt 0.13
#FROM janschultecom/docker-scala

# Base image
#FROM hseeberger/scala-sbt

RUN apt-get install -y nodejs 

# caching dependencies
COPY ["build.sbt", "/tmp/build/"]
COPY ["project/plugins.sbt", "project/build.properties", "/tmp/build/project/"]
COPY ["project/build.properties", "/"]

RUN apt-get install git
#RUN apt-get update
#RUN apt-get install nodejs

RUN cd /tmp/build 
RUN sbt compile 
RUN sbt test:compile 
# clean
RUN rm -rf /tmp/build


# copy code
COPY . /app/
RUN mkdir -p ~/.ivy2/cache/org.nlogo/
RUN mv /app/play-scrape-server_2.12 ~/.ivy2/cache/org.nlogo/play-scrape-server_2.12

WORKDIR /app

#RUN git clone https://github.com/gpgekko/sbt-autoprefixer /root/.sbt/0.13/staging/a13d8a10bd266a4d281d/sbt-autoprefixer
#COPY sbt-autoprefixer /root/.sbt/0.13/staging/a13d8a10bd266a4d281d/

RUN npm install

#RUN sbt update 
#RUN sbt compile 
#RUN sbt test:compile
#RUN sbt  

EXPOSE 9000
#ENTRYPOINT ["sbt","run"]
#CMD ["sbt","run"]
CMD ["sbt", "-mem", "1024", "run"]