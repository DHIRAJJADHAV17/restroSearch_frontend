"use client"; // Ensure this is at the very top

import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useGetAdmin } from "@/app/api/MyAdminApi";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(5, "Email is required"),
  password: z.string().min(5, "Password is required"),
});

export type AdminData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const form = useForm<AdminData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    // You can use this token for any client-side checks or actions
  }, []);

  const OnSubmit = async (data: AdminData) => {
    try {
      const result = await useGetAdmin(data);
      if (result) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="flex items-center justify-center mt-28 ">
          <div className="w-96 border rounded bg-white px-7 py-10 shadow-2xl">
            <h4 className="text-2xl mb-7">Login</h4>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  {form.formState.errors.email && (
                    <span className="text-red-500">
                      {form.formState.errors.email.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" type="password" />
                  </FormControl>
                  {form.formState.errors.password && (
                    <span className="text-red-500">
                      {form.formState.errors.password.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not having an Account? <Link href="/admin/signup">Signup</Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Page;
