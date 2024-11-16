// react hooks
import { LoginData, useEmailLogin } from '@/hooks/useEmaillogin';
import { FieldValues, useForm } from 'react-hook-form';

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { handleEmailLogin } = useEmailLogin();

    const onSubmit = (data: FieldValues) => {
        handleEmailLogin(data as LoginData);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl mb-8 text-center">Login</h2 >

            {/* email */}
            <div>
                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 placeholder-gray-400"
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
            </div>

            {/* password */}
            <div>
                <input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 placeholder-gray-400"
                    placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Log In</button>

        </form>
    );
};

