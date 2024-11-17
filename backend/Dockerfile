# Use Go 1.20 as the base image
FROM golang:1.20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files first
COPY backend/go.mod backend/go.sum ./

# Install Go dependencies
RUN go mod tidy

# Copy the rest of the backend files
COPY backend/ .

# Build the Go application
RUN go build -o backend .

# Expose the backend port 8081
EXPOSE 8081

# Start the Go Fiber app
CMD ["./backend"]
