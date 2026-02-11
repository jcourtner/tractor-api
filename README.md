# Tractor API

HTTP API service that receives text commands to remotely control a tractor navigating a banana plantation grid.

## Installation

```bash
npm install
```

## Running

```bash
# Development
npm run dev
```

The server runs on port 3000.

## Usage

Send commands as plain text via POST requests:

```bash
# Set position
curl -X POST http://localhost:3000/ -H "Content-Type: text/plain" -d "S(2, 1, E)"

# Advance 10 points
curl -X POST http://localhost:3000/ -H "Content-Type: text/plain" -d "A(10)"

# Rotate left
curl -X POST http://localhost:3000/ -H "Content-Type: text/plain" -d "G"

# Rotate right
curl -X POST http://localhost:3000/ -H "Content-Type: text/plain" -d "D"
```

## Commands

| Command        | Description                           | Delay           |
| -------------- | ------------------------------------- | --------------- |
| `S(X, Y, DIR)` | Set position to (X, Y) facing DIR     | Instant         |
| `A(N)`         | Advance N points in current direction | 500ms per point |
| `G`            | Rotate 90 degrees left                | 100ms           |
| `D`            | Rotate 90 degrees right               | 100ms           |

Directions: `N` (North), `S` (South), `E` (East), `O` (Ouest/West)

## Design Choices

- **Express + TypeScript**: Lightweight, well-documented, and suited for a small API. No need for a heavier framework like NestJS for a single endpoint.
- **Plain text body parsing**: The spec defines commands as text, so `express.text()` is used instead of JSON parsing.
- **In-memory command queue**: Commands are queued in an array and processed sequentially with async/await. Each POST returns an immediate 200 response while the tractor executes commands in the background.
- **Discriminated union for commands**: Each command type has a `type` field, enabling TypeScript to narrow types in the switch statement and catch errors at compile time.
- **Separated parser**: Parsing and validation happen before queueing, so invalid commands are rejected immediately with a 400 response.

## What I'd Add With More Time

- **Real-time tracking**: A Server-Sent Events (SSE) endpoint that streams tractor position updates to connected clients.
- **Tests**: Unit tests for the parser and service logic using Jest.
