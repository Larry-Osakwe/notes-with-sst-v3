export async function handler1() {
    return {
        statusCode: 200,
        body: `Hello world. The time is ${new Date().toISOString()}`,
    };
};