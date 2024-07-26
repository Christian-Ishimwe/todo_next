"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import { Spinner } from '@radix-ui/themes';
import { registerUser } from '@/actions/todoActions';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import { signIn } from 'next-auth/react';

const schema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const RegisterForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const id = uuidv4();
    data.id = id;

    try {
      await registerUser(data.id, data.username, data.email, data.password);
      toast({
        title: "Success",
        description: "User registered successfully, please sign in.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-700 px-3 py-4 rounded-xl">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        {/* Existing form fields */}
        <Form.Field name="username">
          <Form.Label className="block text-sm font-medium text-white">Username</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              placeholder='Enter your username'
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

        <Form.Field name="email">
          <Form.Label className="block text-sm font-medium text-white">Email</Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              placeholder='Enter your Email Address'
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 text-white bg-slate-900 rounded-md px-2 py-3"
              {...register('email')}
            />
          </Form.Control>
          {errors.email?.message && (
            <Form.Message className="text-sm text-red-950">
              {String(errors.email.message)}
            </Form.Message>
          )}
        </Form.Field>

        <Form.Field name="password">
          <Form.Label className="block text-sm font-medium text-white">Password</Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              placeholder='Create Password'
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
            className="mt-4 w-full bg-white text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 text-center"
          >
            {loading ? <Spinner /> : "Register"}
          </button>
        </Form.Submit>
      </Form.Root>
      
      {/* Google Sign-In Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => signIn('google')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
