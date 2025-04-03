import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Request } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

const server = new Server({
  name: "MCP Clusters API v1",
  version: "1.0.0",
  description: "MCP Clusters API v1"
});

// ==================
// Authentication Endpoints
// ==================

const AuthGetMessageSchema = z.object({
  method: z.literal("auth_get_message")
});

server.setRequestHandler(AuthGetMessageSchema, async () => {
  const response = await fetch("https://api.clusters.xyz/v1/auth/message", {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const AuthGetTokenSchema = z.object({
  method: z.literal("auth_get_token"),
  params: z.object({
    signature: z.string(),
    signingDate: z.string(),
    type: z.enum(["evm", "solana"]),
    wallet: z.string()
  })
});

server.setRequestHandler(AuthGetTokenSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AuthGetTokenSchema>["params"];
  const { signature, signingDate, type, wallet } = params;
  const response = await fetch("https://api.clusters.xyz/v1/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify({ signature, signingDate, type, wallet })
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const AuthValidateTokenSchema = z.object({
  method: z.literal("auth_validate_token"),
  params: z.object({
    authKey: z.string()
  })
});

server.setRequestHandler(AuthValidateTokenSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AuthValidateTokenSchema>["params"];
  const { authKey } = params;
  const response = await fetch("https://api.clusters.xyz/v1/auth/validate", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

// ==================
// Clusters Endpoints
// ==================

const CreateClusterSchema = z.object({
  method: z.literal("create_cluster"),
  params: z.object({
    wallets: z.array(z.object({
      address: z.string(),
      name: z.string(),
      isPrivate: z.boolean()
    })),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(CreateClusterSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof CreateClusterSchema>["params"];
  const { wallets, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(wallets)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetClusterByIdSchema = z.object({
  method: z.literal("get_cluster_by_id"),
  params: z.object({
    id: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetClusterByIdSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterByIdSchema>["params"];
  const { id, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/id/${id}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetClusterByNameSchema = z.object({
  method: z.literal("get_cluster_by_name"),
  params: z.object({
    name: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetClusterByNameSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterByNameSchema>["params"];
  const { name, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/name/${name}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetClusterIdByAddressSchema = z.object({
  method: z.literal("get_cluster_id_by_address"),
  params: z.object({
    address: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetClusterIdByAddressSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterIdByAddressSchema>["params"];
  const { address, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/address/${address}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const AddWalletsSchema = z.object({
  method: z.literal("add_wallets"),
  params: z.object({
    wallets: z.array(z.object({
      address: z.string(),
      name: z.string(),
      isPrivate: z.boolean()
    })),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(AddWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AddWalletsSchema>["params"];
  const { wallets, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/wallets${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(wallets)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GenerateWalletSchema = z.object({
  method: z.literal("generate_wallet"),
  params: z.object({
    type: z.enum(["evm", "solana"]),
    name: z.string(),
    isPrivate: z.boolean(),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GenerateWalletSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GenerateWalletSchema>["params"];
  const { type, name, isPrivate, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/generate/wallet${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify({ type, name, isPrivate })
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const UpdateWalletsSchema = z.object({
  method: z.literal("update_wallets"),
  params: z.object({
    wallets: z.array(z.object({
      address: z.string(),
      name: z.string()
    })),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(UpdateWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof UpdateWalletsSchema>["params"];
  const { wallets, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/wallets/names${testnet ? '?testnet=true' : ''}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(wallets)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const RemoveWalletsSchema = z.object({
  method: z.literal("remove_wallets"),
  params: z.object({
    addresses: z.array(z.string()),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(RemoveWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof RemoveWalletsSchema>["params"];
  const { addresses, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/wallets${testnet ? '?testnet=true' : ''}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(addresses)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const VerifyWalletSchema = z.object({
  method: z.literal("verify_wallet"),
  params: z.object({
    clusterId: z.string(),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(VerifyWalletSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof VerifyWalletSchema>["params"];
  const { clusterId, authKey, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/clusters/verify/${clusterId}${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

// ==================
// Address → Cluster Name Endpoints
// ==================

const GetDataByAddressSchema = z.object({
  method: z.literal("get_data_by_address"),
  params: z.object({
    address: z.string(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetDataByAddressSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetDataByAddressSchema>["params"];
  const { address, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/names/address/${address}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetBulkDataByAddressesSchema = z.object({
  method: z.literal("get_bulk_data_by_addresses"),
  params: z.object({
    addresses: z.array(z.string()),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetBulkDataByAddressesSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetBulkDataByAddressesSchema>["params"];
  const { addresses, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/names/address${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(addresses)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

// ==================
// Cluster Name → Address Endpoints
// ==================

const GetBulkDataByNameSchema = z.object({
  method: z.literal("get_bulk_data_by_names"),
  params: z.object({
    names: z.array(z.object({
      name: z.string()
    })),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetBulkDataByNameSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetBulkDataByNameSchema>["params"];
  const { names, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/names${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(names)
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

// ==================
// Registration Endpoints
// ==================

const CheckNameAvailabilitySchema = z.object({
  method: z.literal("check_name_availability"),
  params: z.object({
    names: z.array(z.string())
  })
});

server.setRequestHandler(CheckNameAvailabilitySchema, async (request: Request) => {
  const params = request.params as z.infer<typeof CheckNameAvailabilitySchema>["params"];
  const { names } = params;
  const response = await fetch("https://api.clusters.xyz/v1/names/register/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify(names)
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetRegistrationSignDataSchema = z.object({
  method: z.literal("get_registration_sign_data"),
  params: z.object({
    network: z.enum(["1", "10", "56", "137", "8453", "81457", "17000", "42161", "43114", "11155111", "solana"]),
    sender: z.string(),
    names: z.array(z.object({
      name: z.string(),
      amountWei: z.string().optional()
    })),
    referralClusterId: z.string().optional(),
    testnet: z.boolean().optional()
  })
});

server.setRequestHandler(GetRegistrationSignDataSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetRegistrationSignDataSchema>["params"];
  const { network, sender, names, referralClusterId, testnet } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/register/${network === "solana" ? "solana" : "evm"}${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    },
    body: JSON.stringify({ network,sender, names, referralClusterId })
  });
  
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const GetTransactionStatusSchema = z.object({
  method: z.literal("get_transaction_status"),
  params: z.object({
    txHash: z.string()
  })
});

server.setRequestHandler(GetTransactionStatusSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetTransactionStatusSchema>["params"];
  const { txHash } = params;
  const response = await fetch(`https://api.clusters.xyz/v1/names/register/tx/${txHash}`, {
    headers: {
      "X-API-KEY": process.env.CLUSTERS_API_KEY || ""
    }
  });
  const data = await response.json();
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);