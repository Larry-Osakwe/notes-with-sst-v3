import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const dynamoDb = {
    put: async (params: any) => {
        const command = new PutCommand(params);
        return client.send(command);
    },
    // Additional commands can be implemented similarly
};