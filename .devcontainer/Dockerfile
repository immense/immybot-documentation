# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.158.0/containers/alpine/.devcontainer/base.Dockerfile

# [Choice] Alpine version: 3.12, 3.11, 3.10
ARG VARIANT="3.12"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-alpine-${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
RUN apk update \
  && apk add --no-cache nodejs yarn