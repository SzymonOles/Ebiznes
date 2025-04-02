package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
)

func main() {
	initDB()
	e := echo.New()
	registerRoutes(e)
	fmt.Println("http://localhost:8080/")
	e.Logger.Fatal(e.Start(":8080"))
}
