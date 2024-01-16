import {ValidationSchema} from '@core/interfaces/validationSchema';
import Joi from 'joi';

const loginValidation: ValidationSchema = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginValidation;