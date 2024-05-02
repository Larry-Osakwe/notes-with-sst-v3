import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import * as uuid from "uuid";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));


export const main = async (event: any) => {
    let data, params;

    if (event.body) {
        data = JSON.parse(event.body);
        params = {
            TableName: Resource.NotesSST3.name,
            Item: {
                userId: "123",
                noteId: uuid.v1(),
                content: data.content,
                attachment: data.attachment,
                createdAt: Date.now(),
            },
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
    }

    try {
        const command = new PutCommand({
            TableName: params.TableName,
            Item: params.Item,
        });

        await dynamoDb.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
}