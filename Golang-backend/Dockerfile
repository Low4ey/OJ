# Use an official Golang runtime as the base image
FROM jals413/goimage

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files
COPY go.mod .
COPY go.sum .

# Download the Go module dependencies
RUN go mod download

# Copy the rest of the project files
COPY . .

# Build the Go application
RUN go build -o main .

# Set the command to run the executable
CMD ["./main"]
