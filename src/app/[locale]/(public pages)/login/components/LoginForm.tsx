"use client"
import SiteLogo from "@/sharedComponents/header/SiteLogo";
import { Input, PasswordToggler, SubmitBtn } from "@/sharedComponents/shared/FormEl";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Login form
const loginSchema = z.object({
    email: z.email("authentication.invalidEmailError"),
    password: z.string().nonempty("authentication.passwordError").min(6, "Password must be at least 6 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>;
export default function LoginForm() {
    // hooks
    const t = useTranslations()
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [showPassword, setShowPassword] = useState(false);

    // handlers
    const onSubmit = async (data: LoginSchema) => {
        // Simulate API call

        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("API integration in progress")
        reset({
            email: "",
            password: ""
        });
        console.log("Form Submitted:", data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-clr-card p-4 rounded-xl prevent-body-trigger flex flex-col gap-4 w-full max-w-[500px]">
                <div className="w-full flex justify-center">
                    <SiteLogo />
                </div>
                <h1 className="">{t('authentication.login')}</h1>
                <Input
                    control={control}
                    label={t("authentication.email")}
                    name="email"
                    errorMessage={t(errors?.email?.message ?? 'authentication.emailError')}
                />
                <Input
                    control={control}
                    label={t("authentication.password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    errorMessage={t(errors?.password?.message ? 'authentication.passwordError' : "")}
                >
                    <PasswordToggler show={showPassword} dispatcher={setShowPassword} />
                </Input>
                <SubmitBtn isSubmitting={isSubmitting} />
            </form>
        </>
    )
}
