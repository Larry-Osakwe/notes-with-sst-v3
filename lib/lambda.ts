export async function handler() {
    return {
        statusCode: 200,
        body: `Hello world. The time is ${new Date().toISOString()}`,
    };
};