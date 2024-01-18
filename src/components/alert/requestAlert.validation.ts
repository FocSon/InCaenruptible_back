import {ValidationSchema} from '@core/interfaces/validationSchema';
import Joi from 'joi';

const requestAlertValidation: ValidationSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required().valid('video', 'image', 'data'),
    category: Joi.string().required()
  }),
};

const requestPostValidation: ValidationSchema = {
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
};

export {
  requestAlertValidation,
  requestPostValidation,
};
