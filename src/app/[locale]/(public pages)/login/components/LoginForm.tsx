"use client"
import { loginUser } from "@/actions/login";
import { cn } from "@/lib/utils";
import { setAuthUser, updateToken } from "@/redux/features/auth/AuthSlice";
import SiteLogo from "@/sharedComponents/header/SiteLogo";
import { Input, PasswordToggler, SubmitBtn } from "@/sharedComponents/shared/FormEl";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

type TLoginErrorResponse = {
    status: number;
    data: { message: string; }
}

// Login form
const loginSchema = z.object({
    email: z.email("authentication.invalidEmailError"),
    password: z.string().nonempty("authentication.passwordError").min(6, "authentication.passwordError"),
})

type LoginSchema = z.infer<typeof loginSchema>;
export default function LoginForm() {
    // hooks
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
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
        setIsLoading(true)
        try {
            const res = await loginUser(data.email, data.password);
            dispatch(setAuthUser(res.user));
            dispatch(updateToken(res.token));
            reset({
                email: "",
                password: ""
            });

            router.replace('/')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e?.status === 401) {
                setError('password', { type: "manual", message: "authentication.invalidCredentials" })
            }
        } finally {
            setIsLoading(false)
        }
    };

    const emailError = errors?.email?.message ? errors?.email?.message : 'authentication.emailError'
    const passwordError = errors?.password?.message ? errors?.password?.message : 'authentication.passwordError'
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={cn("bg-clr-card p-4 rounded-xl prevent-body-trigger flex flex-col gap-4 w-full max-w-[500px]", isLoading && "pointer-events-none")}>
                <div className="w-full flex justify-center">
                    <SiteLogo />
                </div>
                <h1 className="">{t('authentication.login')}</h1>
                <Input
                    control={control}
                    label={t("authentication.email")}
                    name="email"
                    errorMessage={t(emailError)}
                    showErrorMessage={true}
                />
                <Input
                    control={control}
                    label={t("authentication.password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    errorMessage={t(passwordError)}
                    showErrorMessage={true}
                >
                    <PasswordToggler show={showPassword} dispatcher={setShowPassword} />
                </Input>
                <SubmitBtn isSubmitting={isLoading} />
            </form>
        </>
    )
}
