package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.embeddedServer
import net.dv8tion.jda.api.*
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.requests.GatewayIntent
import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.Application
import io.ktor.server.netty.Netty


// Bot Discord
class DiscordBot : ListenerAdapter() {
    private val kategorie = mapOf(
        "elektronika" to listOf("Laptop", "Smartfon", "Tablet"),
        "agd" to listOf("Lodówka", "Pralka", "Mikrofalówka"),
        "meble" to listOf("Kanapa", "Stół", "Krzesło")
    )

    override fun onMessageReceived(event: MessageReceivedEvent) {
        val message = event.message.contentRaw.lowercase()
        val channel = event.channel

        when {
            message == "!kategorie" -> {
                val response = "Dostępne kategorie: " + kategorie.keys.joinToString(", ")
                channel.sendMessage(response).queue()
            }
            message.startsWith("!") -> {
                val categoryName = message.substring(1)
                val produkty = kategorie[categoryName]
                if (produkty != null) {
                    channel.sendMessage("Produkty w kategorii **$categoryName**: ${produkty.joinToString(", ")}").queue()
                } else {
                    channel.sendMessage("Nie znaleziono kategorii: **$categoryName**. Użyj `!kategorie` aby zobaczyć dostępne.").queue()
                }
            }
        }
    }
}

// Funkcja główna
fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

// Ktor
fun Application.module() {
    val dotenv = dotenv()
    val token = dotenv["DISCORD_TOKEN"] ?: throw IllegalArgumentException("Brak tokena!")

    val jda = JDABuilder.createDefault(token, GatewayIntent.GUILD_MESSAGES, GatewayIntent.MESSAGE_CONTENT)
        .addEventListeners(DiscordBot())
        .build()
        .awaitReady()

    environment.log.info("!!! Bot Discord jest online !!!")

    environment.monitor.subscribe(ApplicationStopPreparing) {
        jda.shutdown()
        environment.log.info("!!! Bot Discord został zatrzymany !!!")
    }
}
