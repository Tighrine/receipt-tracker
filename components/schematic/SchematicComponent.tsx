import getTemporaryAccessToken from '@/actions/getTemporaryAccessToken';
import SchematicEmbed from './SchematicEmbed';

async function SchematicComponent({ componentId }: { componentId: string }) {
    if (!componentId) {
        return null;
    }

    const accessToken = await getTemporaryAccessToken(componentId);

    if (!accessToken) {
        throw new Error('Failed to get access token for current user');
    }

    return <SchematicEmbed accessToken={accessToken} id={componentId} />;
}

export default SchematicComponent;
