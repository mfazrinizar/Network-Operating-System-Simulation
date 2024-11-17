package middlewares

import (
	"os"
	"strings"

	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v5"
)

// Middleware JWT function
func NewAuthMiddleware() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(os.Getenv("SECRET_JWT"))},
	})
}

func NewAdminAuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Extract the token from the Authorization header
		authHeader := c.Get("Authorization")
		// fmt.Println(authHeader)
		if !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Missing or invalid token",
			})
		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// Parse the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Ensure the signing method is correct
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
			}
			return []byte(os.Getenv("SECRET_JWT")), nil
		})
		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		// Extract claims and validate the role
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token claims",
			})
		}

		role, ok := claims["role"].(string)
		// fmt.Print(role)
		if !ok || role != "admin" {

			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "Access denied: admin role required",
			})
		}

		// Proceed to the next middleware/handler
		return c.Next()
	}
}
