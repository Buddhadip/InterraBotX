# InterraBotX

InterraBotX is an AI-powered code generation and completion tool that leverages the OpenAI GPT-3.5 Turbo model. It provides features such as code completion, code generation, and unit test code generation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

InterraBotX is designed to assist developers in various aspects of the coding process. Whether you need code completion, code generation, or unit test code, InterraBotX can help streamline your development workflow.

## Features

- Code Chat
- Code Completion
- Code Generation
- Test Case Generation
- Unit Test Code Generation

## Getting Started

### Prerequisites

- Node.js
- OpenAI API Key
- Vite
- Express
- CORS

### Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure your OpenAI API Key in the `.env` file.
4. Now go into the backend folder with `cd backend`.
5. Run the server with `node .index.js`.
6. Now got the frontend folder with `cd frontend`
7. Run the client with `npm run dev`

## Usage

InterraBotX provides a web interface where users can select different use cases (e.g., code completion, code generation,unit test code generation etc.) and interact with the AI model. Supports file upload for testcase generation, allowing users to upload Python files(as of now) with functions. Structured workflow with left and right panels, allowing users to seamlessly switch between different coding tasks.

## API Endpoints

- `/api/code-chat`: Handle code chat requests.
- `/api/code-completion`: Handles code completion requests.
- `/api/code-generation`: Handles code generation requests.
- `/api/unit-test-code-generation`: Handles unit test code generation requests.
- `/api/test-case-generation`: Handles manual testcase generation requests.

## Configuration

Configure your OpenAI API Key and other settings in the `.env` file.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- OpenAI for providing the GPT-3.5 Turbo model.

