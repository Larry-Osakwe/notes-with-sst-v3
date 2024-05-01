/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "notessst3",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    
    
    const table = new sst.aws.Dynamo("NotesSST3", {
      fields: {
        userId: "string",
        noteId: "string"
      },
      primaryIndex: { hashKey: "userId", rangeKey: "noteId" }
    });

    const bucket = new sst.aws.Bucket("NotesBucketSST3", {
      public: true,
    });

    const api = new sst.aws.ApiGatewayV2("NotesAppApi");
    api.route("POST /notes", {
      link: [table],
      handler: "lib/notesApi/create.main",
    });

    new sst.aws.Nextjs("NotesApp", {
      openNextVersion: "3.0.0-rc.15",
    });

    return {
      Table: table.name,
      Bucket: bucket.name,
    };
  },
});
