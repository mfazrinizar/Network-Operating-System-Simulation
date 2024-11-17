package repository

import (
	"github.com/gofiber/fiber/v2"
	middlewares "github.com/mfazrinizar/Network-Operating-System-Simulation/middleware"
)

func (repo *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")

	// Unauthenticated routes
	api.Post("/user", repo.CreateUser)
	api.Post("/login", repo.Login)

	// Restricted routes
	jwtFunc := middlewares.NewAuthMiddleware()
	adminJwtFunc := middlewares.NewAdminAuthMiddleware()
	api.Get("/user/:id", jwtFunc, repo.GetUserByID)
	api.Patch("/user/:id", jwtFunc, repo.UpdateUser)
	api.Delete("/user/:id", jwtFunc, repo.DeleteUser)
	api.Get("/users", adminJwtFunc, repo.GetUsers)
}
