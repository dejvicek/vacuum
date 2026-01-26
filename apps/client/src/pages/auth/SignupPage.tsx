import { type FC, useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import type { SignupRequestDto } from '@/api/auth/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signupSchema, type SignupFormData } from './validation';

export const SignupPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setValidationErrors({});
    clearError();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const errors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof SignupFormData] = t(err.message);
        }
      });
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const credentials: SignupRequestDto = {
        username: result.data.username,
        password: result.data.password,
      };
      await signup(credentials);
      navigate('/players');
    } catch {
      // Error is handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.signup.title')}</CardTitle>
          <CardDescription>{t('auth.signup.description')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{t(error)}</div>}
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.fields.username')}</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.username}
                aria-describedby={validationErrors.username ? 'username-error' : undefined}
              />
              {validationErrors.username && (
                <p id="username-error" className="text-sm text-destructive">
                  {validationErrors.username}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.fields.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.password}
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
              {validationErrors.password && (
                <p id="password-error" className="text-sm text-destructive">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('auth.signup.submitting') : t('auth.signup.submit')}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {t('auth.signup.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('auth.signup.loginLink')}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
