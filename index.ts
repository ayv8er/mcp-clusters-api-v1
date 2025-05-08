import { 
  AuthGetMessageSchema, 
  AuthGetTokenSchema, 
  AuthValidateTokenSchema, 
  CreateClusterSchema, 
  GetClusterByIdSchema, 
  GetClusterByNameSchema, 
  GetClusterIdByAddressSchema, 
  AddWalletsSchema, 
  GenerateWalletSchema, 
  UpdateWalletsSchema, 
  RemoveWalletsSchema, 
  VerifyWalletSchema, 
  GetNameByAddressSchema, 
  GetAllNamesByAddressSchema, 
  GetBulkDataByAddressesSchema, 
  GetBulkDataByNamesSchema,
  CheckNameAvailabilitySchema, 
  GetRegistrationSignDataSchema, 
  GetTransactionStatusSchema,
  CheckCommunityNameAvailabilitySchema,
  RegisterCommunityNameSchema
} from "./schemas.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Request } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

const CLUSTERS_API_URL = "https://api.clusters.xyz/v1";
const CLUSTERS_API_KEY = process.env.CLUSTERS_API_KEY || "";

const server = new Server({
  name: "MCP Clusters API v1",
  version: "2.0.0",
  description: "MCP Clusters API v1"
});


// Authentication Key Endpoints

server.setRequestHandler(AuthGetMessageSchema, async () => {
  const response = await fetch(`${CLUSTERS_API_URL}/auth/message`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(AuthGetTokenSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AuthGetTokenSchema>["params"];
  const { signature, signingDate, type, wallet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(AuthValidateTokenSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AuthValidateTokenSchema>["params"];
  const { authKey } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/auth/validate`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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


// Clusters Endpoints

server.setRequestHandler(CreateClusterSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof CreateClusterSchema>["params"];
  const { authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetClusterByIdSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterByIdSchema>["params"];
  const { id, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/id/${id}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetClusterByNameSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterByNameSchema>["params"];
  const { name, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/name/${name}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetClusterIdByAddressSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetClusterIdByAddressSchema>["params"];
  const { address, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/address/${address}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(AddWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof AddWalletsSchema>["params"];
  const { wallets, authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/wallets${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GenerateWalletSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GenerateWalletSchema>["params"];
  const { type, name, isPrivate, authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/generate/wallet${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(UpdateWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof UpdateWalletsSchema>["params"];
  const { wallets, authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/wallets/names${testnet ? '?testnet=true' : ''}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(RemoveWalletsSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof RemoveWalletsSchema>["params"];
  const { addresses, authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/wallets${testnet ? '?testnet=true' : ''}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(VerifyWalletSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof VerifyWalletSchema>["params"];
  const { clusterId, authKey, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/clusters/verify/${clusterId}${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
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


// Address → Cluster Name Endpoints

server.setRequestHandler(GetNameByAddressSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetNameByAddressSchema>["params"];
  const { address, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/address/${address}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetAllNamesByAddressSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetAllNamesByAddressSchema>["params"];
  const { address, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/owner/address/${address}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetBulkDataByAddressesSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetBulkDataByAddressesSchema>["params"];
  const { addresses, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/address${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": CLUSTERS_API_KEY
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


// Cluster Name → Address Endpoints

server.setRequestHandler(GetBulkDataByNamesSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetBulkDataByNamesSchema>["params"];
  const { names, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": CLUSTERS_API_KEY
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


// Registration Endpoints

server.setRequestHandler(CheckNameAvailabilitySchema, async (request: Request) => {
  const params = request.params as z.infer<typeof CheckNameAvailabilitySchema>["params"];
  const testnet = (request as any).testnet as boolean | undefined;
  const { names } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/register/check${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetRegistrationSignDataSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetRegistrationSignDataSchema>["params"];
  const { network, sender, names, referralClusterId, testnet } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/register/${network === "solana" ? "solana" : "evm"}${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(GetTransactionStatusSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof GetTransactionStatusSchema>["params"];
  const testnet = (request as any).testnet as boolean | undefined;
  const { txHash } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/register/tx/${txHash}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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


// Communities Endpoints

server.setRequestHandler(CheckCommunityNameAvailabilitySchema, async (request: Request) => {
  const params = request.params as z.infer<typeof CheckCommunityNameAvailabilitySchema>["params"];
  const testnet = (request as any).testnet as boolean | undefined;
  const { communityName, name } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/community/${communityName}/check/${name}${testnet ? '?testnet=true' : ''}`, {
    headers: {
      "X-API-KEY": CLUSTERS_API_KEY
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

server.setRequestHandler(RegisterCommunityNameSchema, async (request: Request) => {
  const params = request.params as z.infer<typeof RegisterCommunityNameSchema>["params"];
  const testnet = (request as any).testnet as boolean | undefined;
  const { authKey, communityName, name, walletAddress } = params;
  const response = await fetch(`${CLUSTERS_API_URL}/names/community/${communityName}/register${testnet ? '?testnet=true' : ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-API-KEY": CLUSTERS_API_KEY
    },
    body: JSON.stringify({ name, walletAddress })
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