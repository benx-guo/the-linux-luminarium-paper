.PHONY: build run watch clean help build-en build-zh build-all run-en run-zh

# Default target
help:
	@echo "Available targets:"
	@echo "  make build - Build both English and Chinese versions"
	@echo "  make run   - Serve the mdbook (default port: 3000)"
	@echo "  make watch     - Watch for changes and rebuild automatically"
	@echo "  make clean     - Remove the build directory"

# Build the mdbook in English to book-en/
build-en:
	@echo "Building mdbook in English..."
	@mkdir -p book-en
	@MDBOOK_BOOK__LANGUAGE=en MDBOOK_BUILD__BUILD_DIR=book-en mdbook build
	@echo "Copying language switcher files to English version..."
	@mkdir -p book-en/css book-en/js
	@cp theme/css/language-switcher.css book-en/css/
	@cp theme/js/language-switcher.js book-en/js/

# Build the mdbook in Chinese to book-zh/
build-zh:
	@echo "Building mdbook in Chinese..."
	@mkdir -p book-zh
	@MDBOOK_BOOK__LANGUAGE=zh-CN MDBOOK_PREPROCESSOR__GETTEXT__PO_DIR=po MDBOOK_BUILD__BUILD_DIR=book-zh mdbook build
	@echo "Copying language switcher files to Chinese version..."
	@mkdir -p book-zh/css book-zh/js
	@cp theme/css/language-switcher.css book-zh/css/
	@cp theme/js/language-switcher.js book-zh/js/

# Build both versions and create combined output
build: build-en build-zh
	@echo "Combining both language versions..."
	@mkdir -p book
	@rm -rf book/en book/zh
	@cp -r book-en book/en
	@cp -r book-zh book/zh
	@echo "Creating index.html redirect..."
	@cp theme/index.html.template book/index.html
	@echo "Cleaning temporary language build directories..."
	@rm -rf book-en book-zh
	@echo "Build complete! Both versions are in book/en/ and book/zh/"

# Serve the built mdbook using a simple HTTP server (always uses multi-lang build)
run: build
	@echo "Starting static server for ./book on http://localhost:3000"
	@echo "Press Ctrl+C to stop"
	@cd book && python3 -m http.server 3000

# Watch for changes and rebuild automatically (no auto-reload in browser)
watch:
	@echo "Watching for changes and rebuilding..."
	@echo "Press Ctrl+C to stop"
	@while true; do \
		inotifywait -e modify,create,delete -r src po theme; \
		echo \"Changes detected, rebuilding...\"; \
		make build; \
	done

# Clean build artifacts
clean:
	@echo "Cleaning build directory..."
	rm -rf book book-en book-zh

