import { z } from 'zod';

export const productSchema = z.object({
  sku: z.string()
    .min(1, 'SKU es requerido')
    .min(3, 'SKU debe tener al menos 3 caracteres'),
  name: z.string()
    .min(1, 'Nombre es requerido')
    .min(2, 'Nombre debe tener al menos 2 caracteres'),
  quantity: z.number()
    .min(0, 'La cantidad no puede ser negativa'),
  price: z.number()
    .min(0.01, 'El precio debe ser mayor a 0'),
});

export type ProductFormData = z.infer<typeof productSchema>;