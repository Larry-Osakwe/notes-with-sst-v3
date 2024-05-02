import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export default function handler(lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>) {
    return async function (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        try {
            // Execute the lambda function and return the result
            return await lambda(event, context);
        } catch (error) {
            // Handle any errors that occur during the lambda function execution
            const body = JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
            });
            return {
                statusCode: 500,
                body: body,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
            };
        }
    }
}