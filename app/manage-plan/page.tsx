import SchematicComponent from '@/components/schematic/SchematicComponent';

function ManagePlan() {
    return (
        <div className="container mx-auto xl:max-w-5xl p-4 md:p-0">
            <h1 className="text-2xl font-bold mb-4 my-8">Manage your plan</h1>
            <p className="text-gray-600 mb-8">
                Manage your plan and billing information here.
            </p>

            <SchematicComponent
                componentId={
                    process.env.NEXT_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID!
                }
            />
        </div>
    );
}

export default ManagePlan;
