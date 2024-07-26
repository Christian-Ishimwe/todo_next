"use client"
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import { Spinner } from '@radix-ui/themes';
import { loginUser, registerUser } from '@/actions/todoActions';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
const schema = z.object({
  username: z.string().min(3, 'Username or email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
    const {toast}= useToast()
    const router = useRouter();
    const [loading, setLoading]=useState(false)
  const {
    register,handleSubmit, formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit =async (data:any) => {
    setLoading(true)
    try{
        await loginUser(data.username,data.password)
         toast({
            title: "success",
            description: "User logged in successful"
        })
        router.push("/")
    }catch(err:any){
        toast({
            title: "error",
            variant: "destructive",
            description: err.message
        })
    }
    setLoading(false)
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-700 px-3 py-4 rounded-xl">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="username">
          <Form.Label className="block text-sm font-medium text-white">Username</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              placeholder='Enter your username or password'
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 text-white bg-slate-900 rounded-md px-2 py-3"
              {...register('username')}
            />
          </Form.Control>
          {errors.username?.message && (
            <Form.Message className="text-sm text-red-950">
              {String(errors.username.message)}
            </Form.Message>
          )}
        </Form.Field>

        <Form.Field name="password">
          <Form.Label className="block text-sm font-medium text-white">Password</Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              placeholder='Enter your Password'
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 text-white bg-slate-900 rounded-md p-4"
              {...register('password')}
            />
          </Form.Control>
          {errors.password?.message && (
            <Form.Message className="text-sm text-red-950">
              {String(errors.password.message)}
            </Form.Message>
          )}
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="mt-4 w-full bg-white text-black  py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 text-center"
          >
            {loading? <Spinner /> : "Login" }
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginForm;
