import { z } from "zod";

export const AuthGetMessageSchema = z.object({
  method: z.literal("get_signing_message")
});

export const AuthGetTokenSchema = z.object({
  method: z.literal("get_auth_key"),
  params: z.object({
    signature: z.string(),
    signingDate: z.string(),
    type: z.enum(["evm", "solana"]),
    wallet: z.string()
  })
});

export const AuthValidateTokenSchema = z.object({
  method: z.literal("validate_auth_token"),
  params: z.object({
    authKey: z.string()
  })
});

export const CreateClusterSchema = z.object({
  method: z.literal("create_a_cluster"),
  params: z.object({
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetClusterByIdSchema = z.object({
  method: z.literal("get_cluster_by_id"),
  params: z.object({
    id: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetClusterByNameSchema = z.object({
  method: z.literal("get_cluster_by_name"),
  params: z.object({
    name: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetClusterIdByAddressSchema = z.object({
  method: z.literal("get_cluster_id_by_address"),
  params: z.object({
    address: z.string(),
    testnet: z.boolean().optional()
  })
});

export const AddWalletsSchema = z.object({
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

export const GenerateWalletSchema = z.object({
  method: z.literal("generate_wallet"),
  params: z.object({
    type: z.enum(["evm", "solana"]),
    name: z.string(),
    isPrivate: z.boolean(),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

export const UpdateWalletsSchema = z.object({
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

export const RemoveWalletsSchema = z.object({
  method: z.literal("remove_wallets"),
  params: z.object({
    addresses: z.array(z.string()),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

export const VerifyWalletSchema = z.object({
  method: z.literal("verify_wallet"),
  params: z.object({
    clusterId: z.string(),
    authKey: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetNameByAddressSchema = z.object({
  method: z.literal("get_name_by_address"),
  params: z.object({
    address: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetAllNamesByAddressSchema = z.object({
  method: z.literal("get_all_names_by_address"),
  params: z.object({
    address: z.string(),
    testnet: z.boolean().optional()
  })
});

export const GetBulkDataByAddressesSchema = z.object({
  method: z.literal("get_bulk_data_by_addresses"),
  params: z.object({
    addresses: z.array(z.string()),
    testnet: z.boolean().optional()
  })
});

export const GetBulkDataByNamesSchema = z.object({
  method: z.literal("get_bulk_data_by_names"),
  params: z.object({
    names: z.array(z.object({
      name: z.string()
    })),
    testnet: z.boolean().optional()
  })
});

export const CheckNameAvailabilitySchema = z.object({
  method: z.literal("check_name_availability"),
  params: z.object({
    names: z.array(z.string())
  }),
  testnet: z.boolean().optional()
});

export const GetRegistrationSignDataSchema = z.object({
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

export const GetTransactionStatusSchema = z.object({
  method: z.literal("get_transaction_status"),
  params: z.object({
    txHash: z.string()
  }),
  testnet: z.boolean().optional()
});

export const CheckCommunityNameAvailabilitySchema = z.object({
  method: z.literal("check_community_name_availability"),
  params: z.object({
    communityName: z.string(),
    name: z.string()
  }),
  testnet: z.boolean().optional()
});

export const RegisterCommunityNameSchema = z.object({
  method: z.literal("register_community_name"),
  params: z.object({
    authKey: z.string(),
    communityName: z.string(),
    name: z.string(),
    walletAddress: z.string()
  }),
  testnet: z.boolean().optional()
});