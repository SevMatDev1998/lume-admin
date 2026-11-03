import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { LoginForm, loginSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
import { errorMessage } from '../../api/api';
import { getJwtToken } from '../../utils/tokenUtil';
import RouteEnum from '../../enums/route.enum';
import RegisterInput from '../../components/ui/RegisterInput';
import LoadButton from '../../components/ui/LoadButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  if (getJwtToken()) return <Navigate to={RouteEnum.HOME} replace />;

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data).unwrap();
      navigate(RouteEnum.HOME);
    } catch (error) {
      toast.error(errorMessage(error, 'Invalid email or password'));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight-abyss px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-bice-blue">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[0.2em] text-white">LUME</h1>
          <p className="mt-1 text-sm text-gray-400">Admin panel</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <RegisterInput register={register} errors={errors} label="Email" name="email" type="email" />
          <RegisterInput register={register} errors={errors} label="Password" name="password" type="password" />
          <LoadButton
            loading={isLoading}
            text="Sign in"
            type="submit"
            className="!w-full bg-bice-blue text-white hover:bg-bice-blue-dark"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
