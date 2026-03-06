"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signup } from "@/lib/auth-api";
import { useRouter } from "next/navigation";
import { signupSchema, SignupFormData } from "@/types/auth";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    try {
      const res = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
      });
      if (!res.success) {
        setServerError(res.message);
        return;
      }
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup failed", err);
      setServerError(err.response?.data?.message || err.message || "An error occurred");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                {" "}
                <FieldLabel htmlFor="name">Full Name</FieldLabel>{" "}
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel htmlFor="confirmpassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmpassword"
                      type="password"
                      {...register("confirmpassword")}
                    />
                    {errors.confirmpassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmpassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>

              <Field>
                {serverError && (
                  <p className="text-red-500 text-sm text-center">{serverError}</p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Log In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
