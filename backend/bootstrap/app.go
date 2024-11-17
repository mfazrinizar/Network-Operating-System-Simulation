package bootstrap

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/mfazrinizar/Network-Operating-System-Simulation/database/migrations"
	"github.com/mfazrinizar/Network-Operating-System-Simulation/database/storage"
	"github.com/mfazrinizar/Network-Operating-System-Simulation/repository"
)

func InitializeApp(app *fiber.App) {
	_, ok := os.LookupEnv("APP_ENV")

	if !ok {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal(err)
		}
	}
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("could not load the database")
	}

	err = migrations.MigrateUsers(db)

	if err != nil {
		log.Fatal("Could not migrate db")
	}

	repo := repository.Repository{
		DB: db,
	}
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, https://mfazrinizar.com, http://mfazrinizar.com, http://www.mfazrinizar.com, https://www.mfazrinizar.com, http://192.168.8.40:3000",
		AllowHeaders: "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin,Authorization",
		// AllowOriginsFunc: func(origin string) bool {
		// 	return origin == "http://localhost:3000" || origin == "https://mfazrinizar.com"
		// },
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	repo.SetupRoutes(app)
	listenErr := app.Listen(":8081")
	if listenErr != nil {
		log.Fatal(listenErr)
	}
}
