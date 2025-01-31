const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación adoptme Pets",
            version: "1.0.0",
            description: "Documentación API adoptme - Comis 70150"
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: "Development"
            },
        ],
    },
    apis: ["./src/docs/Pets.yaml"]
}

export default options