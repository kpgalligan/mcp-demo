# MCP Demo Project - LLM Context

## Project Overview

This is a demonstration project for building Model Context Protocol (MCP) servers, designed for a workshop on using and building MCP servers. The project implements a simple MCP server in TypeScript that provides tools for LLM clients to interact with terminal commands.

## Project Structure

```
mcp-demo-repo/
├── src/
│   └── index.ts              # Main MCP server implementation
├── dist/                     # Compiled JavaScript output (generated)
├── node_modules/            # Dependencies (generated)
├── package.json             # Project configuration and dependencies
├── package-lock.json        # Locked dependency versions
├── tsconfig.json           # TypeScript compiler configuration
├── .prettierrc             # Code formatting rules
├── .gitignore              # Git ignore patterns
└── LLM-Context.md          # This documentation file
```

## Dependencies

### Runtime Dependencies
- `@modelcontextprotocol/sdk` (^1.12.0) - The official MCP TypeScript SDK

### Development Dependencies
- `typescript` (^5.8.3) - Latest TypeScript compiler
- `prettier` (^3.5.3) - Code formatter
- `@types/node` (^22.15.21) - Node.js type definitions

## MCP Server Implementation

### Server Configuration
The MCP server is configured with:
- **Name**: `mcp-demo-server`
- **Version**: `1.0.0`
- **Description**: "Our very own MCP Server"
- **Transport**: StdioServerTransport (communicates via stdin/stdout)

### Available Tools

#### `time_now`
- **Description**: "Get the current time"
- **Parameters**: None (empty schema `{}`)
- **Functionality**: Executes the `date` command and returns the current time

### Terminal Command Execution Pattern

The server uses a modern, secure approach for executing terminal commands:

```typescript
import { promisify } from 'util';
import { execFile } from 'child_process';

const execFileAsync = promisify(execFile);

// Usage in tool implementation:
const { stdout, stderr } = await execFileAsync('date', [], {
  encoding: 'utf8',
});
```

**Key Implementation Details:**
1. **Security**: Uses `execFile` instead of `exec` to prevent shell injection attacks
2. **Modern Async**: Uses `promisify` to convert callback-based `execFile` to async/await pattern
3. **Error Handling**: Properly handles both stdout and stderr from command execution
4. **Encoding**: Explicitly sets UTF-8 encoding for proper text handling

### Server Startup Process

1. Creates an MCP server instance with configuration
2. Registers tools using the simplified `server.tool()` API
3. Establishes StdioServerTransport for communication
4. Connects the server to the transport
5. Handles fatal errors with proper exit codes

## Build and Development Setup

### Available Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run the server locally
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

### TypeScript Configuration
- **Target**: ES2022
- **Module System**: CommonJS
- **Output Directory**: `./dist`
- **Source Directory**: `./src`
- **Strict Mode**: Enabled
- **Source Maps**: Enabled for debugging

### CLI Integration
The project is configured as a CLI tool:
- **Binary Name**: `mcp-demo`
- **Entry Point**: `./dist/index.js`
- **Shebang**: `#!/usr/bin/env node` for direct execution

## Usage Context

This MCP server is designed to be connected to MCP-compatible clients (like Claude Desktop, Cursor, or other LLM applications) to provide them with terminal command capabilities. The server communicates using the Model Context Protocol over stdio, allowing LLMs to call the `time_now` tool to get current system time information.

## Security Considerations

- Uses `execFile` instead of `exec` to prevent shell injection
- Limited to specific commands (currently only `date`)
- No user input passed directly to shell commands
- Proper error handling prevents information leakage