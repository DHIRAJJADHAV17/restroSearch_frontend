"use client";
import React from "react";
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
import { useCreateAdmin } from "@/app/api/MyAdminApi";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, "name is required"),
  email: z
    .string()
    .min(5, "email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z.string().min(5, "email is required"),
});

export type AdminFormData = z.infer<typeof formSchema>;
const Page = () => {
  const router = useRouter();
  const form = useForm<AdminFormData>({
    resolver: zodResolver(formSchema),
  });

  const OnSubmit = async (data: AdminFormData) => {
    try {
      const result = await useCreateAdmin(data);

      if (result) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="flex items-center justify-center mt-28 ">
          <div className="w-96 border rounded bg-white px-7 py-10 shadow-2xl">
            <h4 className="text-2xl mb-7">SignUp </h4>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  {form.formState.errors.name && (
                    <span className="text-red-500">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

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
              Signup
            </button>
            <p className="text-sm text-center mt-4">
              Already have an Account?
              <Link href="/admin/login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Page;
