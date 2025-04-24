'use client';

import { SchematicEmbed as SchematicEmbedComponent } from '@schematichq/schematic-components';

function SchematicEmbed({
    accessToken,
    id,
}: {
    accessToken: string;
    id: string;
}) {
    return <SchematicEmbedComponent accessToken={accessToken} id={id} />;
}

export default SchematicEmbed;
