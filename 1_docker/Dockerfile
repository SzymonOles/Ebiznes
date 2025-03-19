FROM ubuntu:24.04

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get install -y \
    software-properties-common \
    zip unzip curl wget git \
    coreutils findutils procps \
    gawk sed grep bc xz-utils

#Instalacja Pythona 3.10
RUN add-apt-repository ppa:deadsnakes/ppa && apt-get update
RUN apt-get install -y python3.10 python3.10-venv python3.10-dev
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1

# Instalacja Javy 8 (OpenJDK 8)
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Instalacja sdkman do kotlina i gradle
RUN curl -s "https://get.sdkman.io" | bash
ENV SDKMAN_DIR="/root/.sdkman"
ENV PATH="$SDKMAN_DIR/bin:$SDKMAN_DIR/candidates/kotlin/current/bin:$SDKMAN_DIR/candidates/gradle/current/bin:$PATH"

# Instalacja Kotlina
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

# Instalacja najnowszego Gradle
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle"

WORKDIR /app
COPY build.gradle.kts .
COPY src ./src

RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && gradle build"

# Uruchomienie przez gradle
CMD ["gradle", "run"]
