import { useEffect } from 'react';
import { useForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';

import { useSidebarContext } from '@/contexts/useSidebarContext';

export const useFormWithSidebar = <TFieldValues extends FieldValues = FieldValues>(
  options?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> => {
  const { isOpen } = useSidebarContext();
  const form = useForm<TFieldValues>(options);

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form.reset, form]);

  return form;
};
