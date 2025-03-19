# Użyj obrazu OpenJDK
FROM openjdk:17-jdk-slim

# Ustawienie katalogu roboczego
WORKDIR /app

# Instalacja niezbędnych narzędzi
RUN apt-get update && apt-get install -y unzip curl && rm -rf /var/lib/apt/lists/*

# Skopiowanie plików projektu
COPY . .

# Pobranie i instalacja SBT
RUN curl -L https://github.com/sbt/sbt/releases/download/v1.8.2/sbt-1.8.2.tgz | tar xz -C /usr/local && \
    ln -s /usr/local/sbt/bin/sbt /usr/local/bin/sbt

# Kompilacja aplikacji Play
RUN sbt dist

# Sprawdzenie, czy `target/universal/` zawiera pliki
RUN ls -l target/universal/

# Rozpakowanie aplikacji Play
RUN unzip -q target/universal/*.zip -d /app

# Znalezienie nazwy katalogu aplikacji
RUN mv /app/scala-1.0-SNAPSHOT /app/play-app

# Ustawienie katalogu aplikacji
WORKDIR /app/play-app

# Nadanie uprawnień do uruchamiania skryptu startowego
RUN chmod +x bin/*

# Uruchomienie aplikacji
CMD ["bin/scala", "-Dplay.http.secret.key=QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241AB`R5W:!*J!YFHG!*!GBHF*)1uDFN];Ik@n"]
