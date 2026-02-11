import { FC } from 'react';
import { signIn } from '@/api/auth';

import { ActionButton } from '@/components/action-button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  username: string;
  password: string;
};

export const SignInPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const { t } = useTranslation();

  const onSubmit = async ({ username, password }: LoginFormData) => {
    try {
      await signIn(username, password);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="text-start">
            <div className="mt-10 space-y-6">
              <div className="w-full">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                  {`${t('auth.username')}:`}
                </label>

                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    {...register('username', {
                      required: t('auth.errors.username_required'),
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                  {`${t('auth.password')}:`}
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', {
                      required: t('auth.errors.password_required'),
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-end gap-x-6">
          <ActionButton type="submit" disabled={isSubmitting}>
            {t('auth.login')}
          </ActionButton>
        </div>
      </form>
    </div>
  );
};
