import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// Create server instance
const server = new McpServer({
  name: 'mcp-server-template',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  'test-a-tool',
  'Call this with a message and it will echo it back',
  {
    message: z.string().describe('The message to echo'),
  },
  async ({ message }) => {
    // Simulate some tool work
    const msg = await new Promise((resolve) => {
      setTimeout(() => resolve(message), 1000)
    })

    // Returns CallToolResult (defined in @modelcontextprotocol/sdk)
    return {
      content: [
        {
          type: 'text',
          text: `You said: ${msg}`,
        },
      ],
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.log('MCP-Server-Template running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
