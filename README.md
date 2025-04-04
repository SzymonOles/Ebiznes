### Projekty E-biznes - wszystko na głównym branchu, każdy folder zawiera osobny projekt

**Zadanie 1** Docker

:white_check_mark: 3.0 obraz ubuntu:24.04 z Pythonem w wersji 3.10

:white_check_mark: 3.5 obraz ubuntu:24.04 z Javą w wersji 8 oraz Kotlinem

:white_check_mark: 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)

:white_check_mark: 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle

:x: 5.0 dodać konfigurację docker-compose

Kod: https://github.com/SzymonOles/Ebiznes/tree/main/1_docker

**Zadanie 2:** Scala

:white_check_mark: 3.0 Należy stworzyć kontroler do Produktów

:white_check_mark: 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy

:white_check_mark: 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD

:white_check_mark: 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok (nie podawać tokena ngroka w gotowym rozwiązaniu)

:white_check_mark: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD

Kod: https://github.com/SzymonOles/Ebiznes/tree/main/Scala

**Zadanie 3:** Kotlin

:white_check_mark: 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord

:white_check_mark: 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)

:white_check_mark: 4.0 Zwróci listę kategorii na określone żądanie użytkownika

:white_check_mark: 4.5 Zwróci listę produktów wg żądanej kategorii

:x: 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex

Kod: https://github.com/SzymonOles/Ebiznes/tree/main/KtorBot

**Zadanie 4:** Go

:white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie
miała kontroler Produktów zgodny z CRUD

:white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz
wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast
listy)

:white_check_mark: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint

:white_check_mark: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią,
a produktem

:white_check_mark: 5.0 pogrupować zapytania w gorm’owe scope'y

Kod: https://github.com/SzymonOles/Ebiznes/tree/main/GoFullstack

**Zadanie 5:** Frontend

:white_check_mark: 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
Produktach powinniśmy pobierać dane o produktach z aplikacji
serwerowej;

:white_check_mark: 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing

:white_check_mark: 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks

:white_check_mark: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose

:white_check_mark: 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

Kod: https://github.com/SzymonOles/Ebiznes/tree/main/ReactApp