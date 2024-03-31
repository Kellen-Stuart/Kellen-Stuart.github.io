.PHONY: start
start:
	npm run start

.PHONY: deploy
deploy:
	npm run predeploy
	npm run deploy
