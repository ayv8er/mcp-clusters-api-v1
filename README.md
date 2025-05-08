# MCP Server - Clusters API v1

This is a Model Context Protocol (MCP) server implementation for the Clusters API v1. It provides endpoints for authentication, cluster management, name registration, and community registrations.

## Dependencies

```json
{
  "@modelcontextprotocol/sdk": "^1.7.0",
  "dotenv": "^16.4.7",
  "zod": "^3.24.2"
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with: CLUSTERS_API_KEY={CLUSTERS_API_KEY} (optional)

3. Build and start the server:
```bash
npm run dev
```

## Testing Endpoints

Since this server uses `StdioServerTransport`, you'll need to send JSON-RPC messages through stdin. Here are example commands for testing each endpoint:

### Authentication Endpoints

#### Get Message
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_signing_message"}' | node dist/index.js
```

#### Get Token
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_auth_key","params":{"signature":"0x123","signingDate":"2024-05-07","type":"evm","wallet":"0x123"}}' | node dist/index.js
```

#### Validate Token
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"validate_auth_token","params":{"authKey":"your-auth-key"}}' | node dist/index.js
```

### Cluster Management Endpoints

#### Create Cluster
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"create_a_cluster","params":{"authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

#### Get Cluster by ID
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_cluster_by_id","params":{"id":"cluster-id","testnet":false}}' | node dist/index.js
```

#### Get Cluster by Name
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_cluster_by_name","params":{"name":"cluster-name","testnet":false}}' | node dist/index.js
```

#### Get Cluster ID by Address
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_cluster_id_by_address","params":{"address":"0x123","testnet":false}}' | node dist/index.js
```

#### Add Wallets
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"add_wallets","params":{"wallets":[{"address":"0x123","name":"new-wallet","isPrivate":false}],"authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

#### Generate Wallet
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"generate_wallet","params":{"type":"evm","name":"new-wallet","isPrivate":false,"authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

#### Update Wallets
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"update_wallets","params":{"wallets":[{"address":"0x123","name":"updated-name"}],"authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

#### Remove Wallets
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"remove_wallets","params":{"addresses":["0x123"],"authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

#### Verify Wallet
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"verify_wallet","params":{"clusterId":"cluster-id","authKey":"your-auth-key","testnet":false}}' | node dist/index.js
```

### Address ↔ Name Resolution Endpoints

#### Get Name by Address
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_name_by_address","params":{"address":"0x123","testnet":false}}' | node dist/index.js
```

#### Get All Names by Address
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_all_names_by_address","params":{"address":"0x123","testnet":false}}' | node dist/index.js
```

#### Get Bulk Data by Addresses
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_bulk_data_by_addresses","params":{"addresses":["0x123","0x456"],"testnet":false}}' | node dist/index.js
```

#### Get Bulk Data by Names
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_bulk_data_by_names","params":{"names":[{"name":"name-1"},{"name":"name-2"}],"testnet":false}}' | node dist/index.js
```

### Registration Endpoints

#### Check Name Availability
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"check_name_availability","params":{"names":["name-1","name-2"],"testnet":false}}' | node dist/index.js
```

#### Get Registration Sign Data
- **This endpoint is not operational at the moment.**
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_registration_sign_data","params":{"network":"1","sender":"0x123","names":[{"name":"name1","amountWei":"1000000000000000000"}],"referralClusterId":"optional-id","testnet":false}}' | node dist/index.js
```

#### Get Transaction Status
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"get_transaction_status","params":{"txHash":"0x123","testnet":false}}' | node dist/index.js
```

### Community Endpoints

#### Check Community Name Availability
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"check_community_name_availability","params":{"communityName":"community-name","name":"some-name","testnet":false}}' | node dist/index.js
```

#### Register Community Name
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"register_community_name","params":{"authKey":"your-auth-key","communityName":"some_community","name":"some_name","walletAddress":"your-wallet-address","testnet":false}}' | node dist/index.js
```

## Notes

1. Replace placeholder values (like `0x123`, `your-auth-key`, etc.) with actual values
2. The `testnet` parameter is optional for all endpoints
3. All responses will be JSON-RPC 2.0 formatted
4. For authenticated endpoints, make sure to obtain and include a valid `authKey`
5. The server uses optional environment variables for configuration, ensure your `.env` file is properly set up to use it