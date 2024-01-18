import { ValidationSchema } from '@core/interfaces/validationSchema';
import { NextFunction, Request, Response } from 'express';
import AppError from '@core/utils/appError';
import httpStatus from 'http-status';
import Joi from 'joi';

const validation =
  (schema: ValidationSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      /* eslint-disable */
      const pickObjectKeysWithValues = (Object: object, Keys: string[]) =>
        Keys.reduce((obj, key) => ((obj[key] = Object[key]), obj), {});
      /* eslint-enable */
      const definedSchemaKeys = Object.keys(schema);
      const acceptableSchemaKeys = ['body', 'query', 'params'];
      const filterOutNotValidSchemaKeys = Object.keys(schema).filter(
        (key) => acceptableSchemaKeys.includes(key),
      );
      if (filterOutNotValidSchemaKeys.length !== definedSchemaKeys.length) {
        const error = `Wrongly defined validation schema keys: [${definedSchemaKeys}], allowed keys: [${acceptableSchemaKeys}]`;
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error, false);
      }
      const validSchema = pickObjectKeysWithValues(schema, filterOutNotValidSchemaKeys);
      const object = pickObjectKeysWithValues(req, Object.keys(validSchema));
      const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

      if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
      }
      Object.assign(req, value);
      return next();
    };

export default validation;
