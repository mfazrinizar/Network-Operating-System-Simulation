package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mfazrinizar/Network-Operating-System-Simulation/bootstrap"
	"github.com/mfazrinizar/Network-Operating-System-Simulation/repository"
)


type Repository repository.Repository

func main() {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}