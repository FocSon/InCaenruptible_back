import { ValidationSchema } from '@core/interfaces/validationSchema';
import Joi from 'joi';


const setMainAlertValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const refuseRequestValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
};


const acceptRequestValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string(),
    description: Joi.string(),
    category: Joi.string,
  }),
};

const deleteAlertValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const endAlertValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    message: Joi.string(),
  }),
};

const updateAlertValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
  }),
};

const createPostValidation: ValidationSchema = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    content: Joi.string(),
    alertIds: Joi.array(),
    medias: Joi.string(),
  }),
};

const deletePostValidation: ValidationSchema = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

export {
    setMainAlertValidation,
    refuseRequestValidation,
    acceptRequestValidation,
    deleteAlertValidation,
    endAlertValidation,
    updateAlertValidation,
    createPostValidation,
    deletePostValidation,
}