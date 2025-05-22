const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API documentation for the Product Review application",
    },
    servers: [
      {
        url: "http://localhost:3030/api",
      },
    ],
  },
  apis: ["./routes/*.ts", "./controllers/*.ts"],
};

export default options;
