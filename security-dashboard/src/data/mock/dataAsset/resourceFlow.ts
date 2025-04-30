 // Corresponds to API: GET /data-asset/resource-flow
// Mock data for this API is currently missing.
// TODO: Add or generate mock data for the resource flow chart (React Flow nodes and edges).

export const resourceFlowData = {
    nodes: [],
    edges: []
};

export const getResourceFlowMock = (): Promise<{ nodes: any[], edges: any[] }> => {
    console.warn("Mock data for getResourceFlow is missing. Returning empty data.");
    return Promise.resolve(resourceFlowData);
};
