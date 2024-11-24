import * as Joi from 'joi';

export const environmentValidationSchema = Joi.object({

    // // Validate database connection
    // DB_PORT: Joi.number().port().default(5432),
    // DB_PASSWORD: Joi.string().required(),
    // DB_USER: Joi.string().required(),
    // DB_NAME: Joi.string().required(),
    // DB_HOST: Joi.string().required(), 
    // DB_SYNC: Joi.boolean().required().default(false),
    // DB_AUTOLOAD: Joi.boolean().required().default(false),

    // Validate app config

    PORT: Joi.number().required().default(5000),

    // // Validate JWT config
    // JWT_SECRET: Joi.string().required(),
    // JWT_AUDIENCE: Joi.string().required(),
    // JWT_ISSUER: Joi.string().required(),
    // JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    


    // Validate Bitrix24 config
    APP_ID: Joi.string().required(),
    BITRIX24_DOMAIN: Joi.string().required().default("adt.bitrix24.vn"),
    APP_SECRET: Joi.string().required(),
    


    // Validate Spreadsheet config
    SPREADSHEET_ID: Joi.string().required()


});
