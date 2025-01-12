import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
});

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  name: yup.string().required()
});

export const bookingSchema = yup.object({
  vehicleId: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required().min(
    yup.ref('startDate'),
    'End date must be after start date'
  )
});

export const reviewSchema = yup.object({
  vehicleId: yup.string().required(),
  rating: yup.number().required().min(1).max(5),
  comment: yup.string()
});

export const paymentSchema = yup.object({
  bookingId: yup.string().required(),
  paymentMethodId: yup.string().required()
});

export const vehicleSchema = yup.object({
  name: yup.string().required(),
  price: yup.string().required(),
  pricePerDay: yup.number().required().positive(),
  description: yup.string(),
  category: yup.string().oneOf(['STANDARD', 'PREMIUM', 'LUXURY', 'SPORT']),
  specs: yup.array().of(yup.string()),
  images: yup.array().of(yup.string())
});
