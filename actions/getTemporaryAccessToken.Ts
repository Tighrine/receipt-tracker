'use server';

import { currentUser } from '@clerk/nextjs/server';
// Initialize Schematic SDK
import { SchematicClient } from "@schematichq/schematic-typescript-node";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Get a temporary access token
async function getTemporaryAccessToken(companyId: string) {

  const user = await currentUser();

  if(!user) {
    console.error("User not found");
    return null;
  }

  const resp = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id }, // The lookup will vary depending on how you have configured your company keys
  });

  return resp.data?.token;
}

export default getTemporaryAccessToken;
