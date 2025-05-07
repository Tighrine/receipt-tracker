import { SchematicClient } from '@schematichq/schematic-typescript-node'

if(!process.env.NEXT_SCHEMATIC_SECRET_API_KEY) {
  throw new Error('NEXT_SCHEMATIC_SECRET_API_KEY is not set')
}

export const client = new SchematicClient({
  apiKey: process.env.NEXT_SCHEMATIC_SECRET_API_KEY,
});