import { Resource } from "sst";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as uuid from "uuid";
import handler from "../handler";
import { dynamoDb } from "../dynamodb";

export const main = handler(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "No data provided" }),
        };
    }

    const data = JSON.parse(event.body);
    const params = {
        TableName: Resource.NotesSST3.name,
        Item: {
            userId: "1234", // Modify as necessary
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        },
    };

    try {
        await dynamoDb.put(params);
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
            }),
        };
    }
});