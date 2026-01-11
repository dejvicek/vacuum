import { useEffect } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Player } from '@/api/player';
import { useFormWithSidebar } from '../useFormWithSidebar';

export type PlayerFormData = {
  first_name: string;
  last_name: string;
  nick_name: string;
};

export const usePlayerForm = (player?: Player | null) => {
  const { t } = useTranslation();

  const playerFormSchema = z.object({
    first_name: z.string().min(1, t('form.errors.first_name_required')),
    last_name: z.string().min(1, t('form.errors.last_name_required')),
    nick_name: z.string().min(1, t('form.errors.nick_name_required')),
  });

  const form = useFormWithSidebar<PlayerFormData>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      nick_name: '',
    },
  });

  useEffect(() => {
    if (!player) return;

    form.reset({
      first_name: player.first_name || '',
      last_name: player.last_name || '',
      nick_name: player.nick_name,
    });
  }, [player, form]);

  return form;
};
