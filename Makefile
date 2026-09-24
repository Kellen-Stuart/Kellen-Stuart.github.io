.PHONY: start
start:
	npm run start

.PHONY: deploy
deploy:
	npm run deploy

# Limit formatting to maintained source and root configuration files.
# Quoted globs are expanded by Prettier, not the shell.
FORMAT_FILES := "src/**/*.{js,jsx,mjs,cjs,ts,tsx,css,scss,html}" \
	"scripts/**/*.{js,mjs,cjs,ts}" \
	"*.{js,jsx,mjs,cjs,ts,tsx,css,scss,html}" \
	package.json

.PHONY: format format-check
format:
	./node_modules/.bin/prettier --write $(FORMAT_FILES)

format-check:
	./node_modules/.bin/prettier --check $(FORMAT_FILES)
