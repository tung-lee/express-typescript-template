import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Router } from 'express';

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'], // Updated to include TypeScript files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const router: Router = Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;