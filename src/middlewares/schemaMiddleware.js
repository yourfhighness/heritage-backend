import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import validateSchema from './validateSchema';

const customJoi = Joi.extend(joiPhone);

const validateRegisterFarmer = (req, res, next) => {
  const registerSchema = Joi.object()
    .keys({
      profilePicture: Joi.string()
        .messages({
          'any.required': 'profilePicture is required',
          'string.empty': 'profilePicture is not allowed to be empty',
        }),
      farmerName: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'farmerName is required',
          'string.empty': 'farmerName is not allowed to be empty',
          'string.min': 'farmerName length must be at least 2 characters long',
        }),
      gender: Joi.string().trim().min(4).max(6)
        .required()
        .messages({
          'any.required': 'gender is required',
          'string.empty': 'gender is not allowed to be empty',
          'string.min': 'gender length must be at least 4 characters long',
          'string.max': 'gender length must be at least 6 characters long',
        }),
      age: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'age is required',
          'string.empty': 'age is not allowed to be empty',
        }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      unitName: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'unitName is required',
          'string.empty': 'unitName is not allowed to be empty',
          'string.min': 'unitName length must be at least 2 characters long',
        }),
      mccName: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'mccName is required',
          'string.empty': 'mccName is not allowed to be empty',
          'string.min': 'mccName length must be at least 2 characters long',
        }),
      mccCode: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'mccCode is required',
          'string.empty': 'mccCode is not allowed to be empty',
          'string.min': 'mccCode length must be at least 2 characters long',
        }),
      userCode: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'userCode is required',
          'string.empty': 'userCode is not allowed to be empty',
          'string.min': 'userCode length must be at least 2 characters long',
        }),
      password: Joi.string().min(6).max(12).required()
        .messages({
          'any.required': '"password" is a required',
          'string.empty': 'password is not allowed to be empty',
          'string.min': 'password length must be at least 6 characters long',
          'string.max': 'password length must be at least 12 characters long',
        }),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    })
    .options({ abortEarly: false });

  return validateSchema(registerSchema, req.body, res, next);
};

const validateRegisterCattle = (req, res, next) => {
  const registerSchema = Joi.object()
    .keys({
      profilePicture: Joi.string().trim().min(5).required()
        .messages({
          'any.required': 'profilePicture is required',
          'string.empty': 'profilePicture is not allowed to be empty',
          'string.min': 'profilePicture length must be at least 5 characters long',
        }),
      status: Joi.string().trim().min(2).required()
        .valid('healthy', 'sick', 'heat')
        .messages({
          'any.required': 'status is required',
          'string.empty': 'status is not allowed to be empty',
          'string.min': 'status length must be at least 2 characters long',
        }),
      cattle: Joi.string().trim().min(2).required()
        .valid('cow', 'buffalo')
        .messages({
          'any.required': 'cattle is required',
          'string.empty': 'cattle is not allowed to be empty',
          'string.min': 'cattle length must be at least 2 characters long',
        }),
      cattleUID: Joi.number().required()
        .messages({
          'any.required': 'cattleUID is required',
          'string.empty': 'cattleUID is not allowed to be empty',
        }),
      cattleName: Joi.string().trim().min(2)
        .required()
        .messages({
          'any.required': 'cattleName is required',
          'string.empty': 'cattleName is not allowed to be empty',
          'string.min': 'cattleName length must be at least 4 characters long',
        }),
      category: Joi.string().trim().min(2).required()
        .valid('calf', 'heifer', 'milking', 'dry')
        .messages({
          'any.required': 'category is required',
          'string.empty': 'category is not allowed to be empty',
          'string.min': 'category length must be at least 2 characters long',
        }),
      age: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'age is required',
          'string.empty': 'age is not allowed to be empty',
        }),
      breed: Joi.string().trim().min(2).required()
        .messages({
          'any.required': 'breed is required',
          'string.empty': 'breed is not allowed to be empty',
          'string.min': 'breed length must be at least 2 characters long',
        }),
      weight: Joi.number().required()
        .messages({
          'any.required': 'weight is required',
          'string.empty': 'weight is not allowed to be empty',
        }),
      milkProduction: Joi.number().required()
        .messages({
          'any.required': 'milkProduction is required',
          'string.empty': 'milkProduction is not allowed to be empty',
        }),
      fatInMilk: Joi.number().required()
        .messages({
          'any.required': 'fatInMilk is required',
          'string.empty': 'fatInMilk is not allowed to be empty',
        }),
      pregnantMonth: Joi.number().required()
        .messages({
          'any.required': 'pregnantMonth is required',
          'string.empty': 'pregnantMonth is not allowed to be empty',
        }),
      LactationNumber: Joi.number().required()
        .messages({
          'any.required': 'LactationNumber is required',
          'string.empty': 'LactationNumber is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(registerSchema, req.body, res, next);
};

const validateLogin = (req, res, next) => {
  const loginSchema = Joi.object()
    .keys({
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      password: Joi.string().min(8).max(12).required()
        .messages({
          'any.required': '"password" is a required',
          'string.empty': 'password is not allowed to be empty',
          'string.min': 'password length must be at least 8 characters long',
          'string.max': 'password length must be at least 12 characters long',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(loginSchema, req.body, res, next);
};

const validateResetLink = (req, res, next) => {
  const resetLinkSchema = Joi.object()
    .keys({
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
    })
    .options({ abortEarly: false });

  return validateSchema(resetLinkSchema, req.body, res, next);
};

const validateResetCode = (req, res, next) => {
  const resetCodeSchema = Joi.object()
    .keys({
      verificationCode: Joi.string().trim().min(3).max(15)
        .required()
        .messages({
          'any.required': 'verificationCode is required',
          'string.empty': 'verificationCode is not allowed to be empty',
          'string.min': 'verificationCode length must be at least 3 characters long',
        }),
      userCode: Joi.string().trim().min(4).max(15)
        .required()
        .messages({
          'any.required': 'userCode is required',
          'string.empty': 'userCode is not allowed to be empty',
          'string.min': 'userCode length must be at least 4 characters long',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(resetCodeSchema, req.body, res, next);
};

const validatePassword = (req, res, next) => {
  const passwordSchema = Joi.object()
    .keys({
      verificationCode: Joi.string().trim().min(3).max(15)
        .required()
        .messages({
          'any.required': 'verificationCode is required',
          'string.empty': 'verificationCode is not allowed to be empty',
          'string.min': 'verificationCode length must be at least 3 characters long',
        }),
      password: Joi.string().min(8).max(12).required()
        .messages({
          'any.required': '"password" is a required',
          'string.empty': 'password is not allowed to be empty',
          'string.min': 'password length must be at least 8 characters long',
          'string.max': 'password length must be at least 12 characters long',
        }),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    })
    .options({ abortEarly: false });

  return validateSchema(passwordSchema, req.body, res, next);
};

const validateUpdateFarmer = (req, res, next) => {
  const updateSchema = Joi.object()
    .keys({
      profilePicture: Joi.string().min(5),
      farmerName: Joi.string().min(2),
      gender: Joi.string().min(4).max(6),
      age: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0]),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }),
      unitName: Joi.string().min(2),
      mccName: Joi.string().min(2),
      mccCode: Joi.string().min(2),
      userCode: Joi.string().min(2),
      password: Joi.string().min(6).max(12)
        .messages({
          'any.required': '"password" is a required',
          'string.empty': 'password is not allowed to be empty',
          'string.min': 'password length must be at least 6 characters long',
          'string.max': 'password length must be at least 12 characters long',
        }),
      confirmPassword: Joi.string().valid(Joi.ref('password')),
    })
    .options({ abortEarly: false });

  return validateSchema(updateSchema, req.body, res, next);
};

const validateUpdateCattle = (req, res, next) => {
  const updateSchema = Joi.object()
    .keys({
      profilePicture: Joi.string().min(5),
      status: Joi.string().valid('healthy', 'sick', 'heat'),
      cattle: Joi.string().valid('cattle', 'buffalo'),
      cattleUID: Joi.number().min(12),
      cattleName: Joi.string().min(2),
      category: Joi.string().valid('calf', 'heifer', 'milking', 'dry'),
      age: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .messages({
          'any.required': 'age is required',
          'string.empty': 'age is not allowed to be empty',
        }),
      breed: Joi.string(),
      weight: Joi.number(),

      milkProduction: Joi.number(),
      fatInMilk: Joi.number(),
      pregnantMonth: Joi.number(),
      LactationNumber: Joi.number(),
    })
    .options({ abortEarly: false });

  return validateSchema(updateSchema, req.body, res, next);
};

const validateSignupOTP = (req, res, next) => {
  const signupOTPSchema = Joi.object()
    .keys({
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      verificationCode: Joi.string().trim().min(3).max(15)
        .required()
        .messages({
          'any.required': 'verificationCode is required',
          'string.empty': 'verificationCode is not allowed to be empty',
          'string.min': 'verificationCode length must be at least 3 characters long',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(signupOTPSchema, req.body, res, next);
};

const validateSlip = (req, res, next) => {
  const slipSchema = Joi.object()
    .keys({
      shift: Joi.string().trim().required()
        .valid('morning', 'evening')
        .messages({
          'any.required': 'shift is required',
          'string.empty': 'shift is not allowed to be empty',
        }),
      quantity: Joi.number().required()
        .messages({
          'any.required': 'amount is required',
          'string.empty': 'amount is not allowed to be empty',
        }),
      fat: Joi.string().trim().required()
        .messages({
          'any.required': 'snf is required',
          'string.empty': 'snf is not allowed to be empty',
        }),
      snf: Joi.string().trim().required()
        .messages({
          'any.required': 'snf is required',
          'string.empty': 'snf is not allowed to be empty',
        }),
      amount: Joi.number().required()
        .messages({
          'any.required': 'amount is required',
          'string.empty': 'amount is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(slipSchema, req.body, res, next);
};

const validateUpdateSlip = (req, res, next) => {
  const updateSchema = Joi.object()
    .keys({
      shift: Joi.string().trim()
        .valid('morning', 'evening')
        .messages({
          'any.required': 'shift is required',
          'string.empty': 'shift is not allowed to be empty',
        }),
      quantity: Joi.number(),
      fat: Joi.string().trim(),
      snf: Joi.string().trim(),
      amount: Joi.number(),
    })
    .options({ abortEarly: false });

  return validateSchema(updateSchema, req.body, res, next);
};

const validateFilterSlip = (req, res, next) => {
  const filterSchema = Joi.object()
    .keys({
      from: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'from is required',
          'string.empty': 'from is not allowed to be empty',
        }),
      to: Joi.date()
        .min(new Date('1990-01-01').toISOString().split('T')[0])
        .max(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'to is required',
          'string.empty': 'to is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(filterSchema, req.body, res, next);
};

const validatePeriodicallySlip = (req, res, next) => {
  const periodicallySchema = Joi.object()
    .keys({
      period: Joi.number().required().valid(6, 31, 365)
        .messages({
          'any.required': 'period is required',
          'string.empty': 'period is not allowed to be empty',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(periodicallySchema, req.body, res, next);
};

const validateAppointment = (req, res, next) => {
  const appointmentSchema = Joi.object()
    .keys({
      doctorId: Joi.required()
        .messages({
          'any.required': 'doctorId is required',
          'string.empty': 'doctorId is not allowed to be empty',
        }),
      description: Joi.string().min(10).required()
        .messages({
          'any.required': 'description is required',
          'string.empty': 'description is not allowed to be empty',
          'string.min': 'description should be 10 words minimum',
        }),
      appointmentDate: Joi.date()
        .min(new Date().toISOString().split('T')[0])
        .required()
        .messages({
          'any.required': 'appointmentDate is required',
          'string.empty': 'appointmentDate is not allowed to be empty',
        }),
      appointmentStartTime: Joi.string().min(5).max(5).required()
        .messages({
          'any.required': 'appointmentStartTime is required',
          'string.empty': 'appointmentStartTime is not allowed to be empty',
          'string.min': 'appointmentStartTime should be like 08:00 or 20:00',
          'string.max': 'appointmentStartTime should be like 07:00 or 19:00',
        }),

      photos: Joi.string().trim().min(6)
        .messages({
          'any.required': 'photos is required',
          'string.empty': 'photos is not allowed to be empty',
          'string.min': 'photos length must be at least 6 characters long',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(appointmentSchema, req.body, res, next);
};

export {
  validateSlip,
  validateLogin,
  validatePassword,
  validateResetLink,
  validateResetCode,
  validateSignupOTP,
  validateUpdateSlip,
  validateFilterSlip,
  validateAppointment,
  validateUpdateFarmer,
  validateUpdateCattle,
  validateRegisterFarmer,
  validateRegisterCattle,
  validatePeriodicallySlip,
};
