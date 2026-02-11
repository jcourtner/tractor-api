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

## What I'd Add With More Time

- **Real-time tracking**: A Server-Sent Events (SSE) endpoint that streams tractor position updates to connected clients. Could also use websockets for two way communication.
