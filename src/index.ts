#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { promisify } from 'util';
import { execFile } from 'child_process';
import { z } from 'zod';

const execFileAsync = promisify(execFile);

const server = new McpServer({
  name: 'mcp-demo-server',
  version: '1.0.0',
  description: 'Our very own MCP Server',
});

server.tool('time_now', 'Get the current time', {}, async () => {
  const { stdout, stderr } = await execFileAsync('date', [], {
    encoding: 'utf8',
  });

  return {
    content: [
      {
        type: 'text',
        text: stdout,
      },
    ],
  };
});

server.tool('open_file', 'Open a file using the system default application', {
  file_path: z.string().describe('Absolute path to the file to open'),
}, async ({ file_path }) => {
  const { stdout, stderr } = await execFileAsync('open', [file_path], {
    encoding: 'utf8',
  });

  return {
    content: [
      {
        type: 'text',
        text: `File opened: ${file_path}`,
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
