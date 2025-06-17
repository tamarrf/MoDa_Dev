FROM ubuntu:bionic

# Surpresses debconf complaints of trying to install apt packages interactively
# https://github.com/moby/moby/issues/4032#issuecomment-192327844

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update --fix-missing
RUN apt upgrade -y
RUN apt install nano less unzip zip curl apache2 mysql-server composer ufw less wget php libapache2-mod-php php-mysql php-curl php-xml php-zip php-mbstring php-soap php-imagick php-intl -y 
RUN ufw allow in "Apache"
RUN service apache2 restart
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"

WORKDIR /var/www
COPY ["craftcms-source", "craftcms"]
RUN chown -R www-data:www-data craftcms

CMD ["apachectl","-D","FOREGROUND"]
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod ssl

EXPOSE 80
EXPOSE 443

