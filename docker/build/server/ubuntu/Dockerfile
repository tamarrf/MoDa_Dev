FROM ubuntu:jammy

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update --fix-missing
RUN apt upgrade -y
RUN apt install -y nano less unzip zip curl apache2 ufw wget mysql-client \
    php8.1 libapache2-mod-php8.1 php8.1-mysql php8.1-curl php8.1-xml \
    php8.1-zip php8.1-mbstring php8.1-soap php8.1-imagick php8.1-intl \
    php8.1-gd php8.1-bcmath
RUN ufw allow in "Apache"
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')" \
    && ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")" \
    && if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then echo 'ERROR: Invalid installer checksum'; rm composer-setup.php; exit 1; fi \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php
WORKDIR /var/www
COPY ["craftcms-source", "craftcms"]
RUN chown -R www-data:www-data craftcms
RUN cd /var/www/craftcms \
    && composer config audit.block-insecure false \
    && composer config allow-plugins.yiisoft/yii2-composer true \
    && composer config allow-plugins.craftcms/plugin-installer true \
    && cp composer.json composer.json.bak \
    && php -r "\$c=json_decode(file_get_contents('composer.json'),true); unset(\$c['repositories']); file_put_contents('composer.json',json_encode(\$c,JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES));" \
    && composer update --no-interaction --ignore-platform-reqs \
    && mv composer.json.bak composer.json
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod ssl
EXPOSE 80
EXPOSE 443
CMD ["apachectl","-D","FOREGROUND"]