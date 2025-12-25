.PHONY: build run watch clean help

# Default target
help:
	@echo "Available targets:"
	@echo "  make build     - Build the mdbook"
	@echo "  make run       - Serve the mdbook (default port: 3000)"
	@echo "  make watch     - Watch for changes and rebuild automatically"
	@echo "  make clean     - Remove the build directory"

# Build the mdbook
build:
	@echo "Building mdbook..."
	mdbook build

# Serve the mdbook (run development server)
run:
	@echo "Starting mdbook server on http://localhost:3000"
	@echo "Press Ctrl+C to stop"
	mdbook serve --open

# Watch for changes and rebuild automatically
watch:
	@echo "Watching for changes..."
	@echo "Press Ctrl+C to stop"
	mdbook watch

# Clean build artifacts
clean:
	@echo "Cleaning build directory..."
	rm -rf book

