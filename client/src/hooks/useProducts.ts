import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productAPI } from '../services/api';
import type { CreateProductData } from '../types/product';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Obtener productos
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAll,
  });

  // Crear producto
  const createMutation = useMutation({
    mutationFn: productAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto creado exitosamente');
    },
    onError: () => {
      toast.error('Error al crear el producto');
    },
  });

  // Actualizar producto
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateProductData }) =>
      productAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el producto');
    },
  });

  // Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: productAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Producto eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el producto');
    },
  });

  return {
    products: products || [],
    isLoading,
    error,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};