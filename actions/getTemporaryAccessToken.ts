'use server';

import { currentUser } from '@clerk/nextjs/server';
import { SchematicClient } from "@schematichq/schematic-typescript-node";

// Get a temporary access token
export async function getTemporaryAccessToken() {
  const user = await currentUser();

  if(!user) {
    console.error("User not found");
    return null;
  }

  const apiKey = process.env.NEXT_SCHEMATIC_SECRET_API_KEY;
  const client = new SchematicClient({ apiKey });

  const resp = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id }, // The lookup will vary depending on how you have configured your company keys
  });

  return resp.data?.token;
}
