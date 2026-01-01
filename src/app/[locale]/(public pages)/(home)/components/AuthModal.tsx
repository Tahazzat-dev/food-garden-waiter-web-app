"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeOff, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { TAuthFormType } from "@/types/types";
import LoadingSpinner from "@/sharedComponents/loading/LoadingSpinner";



export default function AuthModal() {
    const t = useTranslations('authentication');
    const dispatch = useDispatch();
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const [formType, setFormType] = useState<TAuthFormType>("login");
    const KEY = "AUTH_MODAL";



    // handlers
    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }

    useEffect(() => {
        if (KEY === EXPAND) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [EXPAND]);




    return (
        <Dialog.Root open={KEY === EXPAND} onOpenChange={closeModal}>
            <Dialog.Portal>
                <div className=" fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[500px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                    <button onClick={closeModal} className="absolute top-4 right-4 rounded-full !px-2.5"
                    // variant="secondary"
                    > <X className="text-secondary w-6 h-6 lg:w-7 lg:h-7" /></button>
                    <div className="p-4">
                        <Dialog.Title className="fg_fs-3xl text-center mt-4 mb-6">
                            {formType === "login" ? t('login') :
                                formType === "otp" ? t("otp") :
                                    formType === "reset" ? t('resetPassword') :
                                        t('register')}
                        </Dialog.Title>

                        {
                            formType === "login" ? <LoginForm setFormType={setFormType} /> :
                                formType === "otp" ? <PasswordResetForm setFormType={setFormType} /> :
                                    formType === "reset" ? <NewPasswordForm setFormType={setFormType} /> :
                                        <RegisterForm setFormType={setFormType} />
                        }
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}


// Login form
const loginSchema = z.object({
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>;
function LoginForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    const t = useTranslations('authentication');
    // hooks
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const [showPassword, setShowPassword] = useState(false);


    // handlers
    const onSubmit = async (data: LoginSchema) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("API integration in progress")
        console.log("Form Submitted:", data);
        reset();
    };


    const handleForgotPassword = () => {
        // send password reset request
        setFormType("reset");
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="prevent-body-trigger flex flex-col gap-4 w-full">
                <div className="w-full">
                    <label className="mb-1 block">{t('phone')}</label>
                    <input {...register("phone")} className="auth-input" placeholder={t("phonePlaceholder")} />
                    {!!errors.phone && !!errors.phone?.message && <ErrorEl message={t("phoneError")} />}
                </div>

                {/* Password Field */}
                <div className="w-full">
                    <label className="mb-1 block">{t('password')}</label>
                    <div className="w-full relative">
                        <input {...register("password")} className="auth-input" placeholder={t('passwordPlaceholder')} type={showPassword ? "text" : "password"} />
                        {
                            showPassword ? <button className="prevent-body-trigger absolute top-1/2 -translate-y-1/2 right-3" onClick={() => setShowPassword(false)} type="button" ><EyeOff /></button> :
                                <button className="prevent-body-trigger absolute top-1/2 -translate-y-1/2 right-3" onClick={() => setShowPassword(true)} type="button" ><Eye /></button>
                        }
                    </div>
                    {errors.password && errors.password.message && <ErrorEl message={t('passwordError')} />}
                    <button onClick={handleForgotPassword} type="button" className="mt-1.5 text-blue-500 hover:text-blue-600">{t('forgotPassword')}</button>
                </div>
                <SubmitBtn isSubmitting={isSubmitting} />

                <div className="w-full flex justify-center gap-2">
                    <p className="">{t('dontHaveAccount')}</p>
                    <button onClick={() => setFormType("register")} type="button" className="prevent-body-trigger duration-300 text-blue-500 hover:text-blue-600">{t('register')}</button>
                </div>
            </form>
        </>
    )
}



// Register Form
// schema
const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

function RegisterForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    // hooks
    const t = useTranslations('authentication');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });


    // handlers
    const onSubmit = async (data: SignUpSchema) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form Submitted:", data);
        reset();
    };

    // return <SuccessMessage message="Registration Success" />

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="prevent-body-trigger flex flex-col gap-4 w-full">
                <div className="w-full">
                    <label className="mb-1 block">{t('name')}</label>
                    <input {...register("name")} className="auth-input" placeholder={t("namePlaceholder")} />
                    {!!errors.name && !!errors.name?.message && <ErrorEl message={t("nameError")} />}
                </div>

                <div className="w-full">
                    <label className="mb-1 block">{t('phone')}</label>
                    <input {...register("phone")} className="auth-input" placeholder={t("phonePlaceholder")} />
                    {!!errors.phone && !!errors.phone?.message && <ErrorEl message={t("phoneError")} />}
                </div>

                <div className="w-full">
                    <label className="mb-1 block">{t('email')} ({t('optional')})</label>
                    <input {...register("email")} className="auth-input" placeholder={t("emailPlaceholder")} />
                    {!!errors.email && !!errors.email?.message && <ErrorEl message={t("emailError")} />}
                </div>
                <div className="w-full">
                    <label className="mb-1 block">{t('password')}</label>
                    <input {...register("password")} className="auth-input" placeholder={t('passwordPlaceholder')} type="password" />
                    {errors.password && errors.password.message && <ErrorEl message={t('passwordError')} />}
                </div>
                <div className="w-full">
                    <label className="mb-1 block">{t('confirmPassword')}</label>
                    <input {...register("confirmPassword")} className="auth-input" placeholder={t('confirmPasswordPlaceholder')} type="password" />
                    {errors.confirmPassword && errors.confirmPassword.message && <ErrorEl message={t('confirmPasswordError')} />}
                </div>
                <SubmitBtn isSubmitting={isSubmitting} />
                <div className="w-full flex justify-center gap-2">
                    <p className="">{t('haveAccount')}</p>
                    <button onClick={() => setFormType("login")} type="button" className="prevent-body-trigger duration-300 text-blue-500 hover:text-blue-600">{t('login')}</button>
                </div>
            </form>
        </>
    )
}





// Login form
const passwordResetSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits"),
})

type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
function PasswordResetForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    const t = useTranslations('authentication');

    // hooks
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
    });

    // handlers
    const onSubmit = async (data: PasswordResetSchema) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("API integration in progress");
        console.log("Form Submitted:", data);
        reset();
    };

    const handleResendOTP = () => {
        alert("API integration in progress");
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="prevent-body-trigger flex flex-col gap-4 w-full">
                <div className="w-full">
                    <label className="mb-1 block">{t('otp')}</label>
                    <input {...register("otp")} className="auth-input" placeholder={t("otpPlaceholder")} />
                    {!!errors.otp && !!errors.otp?.message && <ErrorEl message={
                        errors.otp.type === "too_small"
                            ? t("otpLengthError")
                            : t("otpRequiredError")} />}
                </div>

                <div className="w-full flex gap-2">
                    <button onClick={handleResendOTP} type="button" className="prevent-body-trigger duration-300 text-blue-500 hover:text-blue-600">{t('resendOtp')}</button>
                </div>
                <SubmitBtn isSubmitting={isSubmitting} />
                <div className="w-full flex justify-center gap-2">
                    <p className="">{t('rememberedPassword')}</p>
                    <button onClick={() => setFormType("login")} type="button" className="prevent-body-trigger duration-300 text-blue-500 hover:text-blue-600">{t('login')}</button>
                </div>
            </form>
        </>
    )
}



// Login form
const newPasswordSchema = z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
function NewPasswordForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    const t = useTranslations('authentication');
    // hooks
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<NewPasswordSchema>({
        resolver: zodResolver(newPasswordSchema),
    });

    // handlers
    const onSubmit = async (data: NewPasswordSchema) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form Submitted:", data);
        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="prevent-body-trigger flex flex-col gap-4 w-full">
                <div className="w-full">
                    <label className="mb-1 block">{t('newPassword')}</label>
                    <input {...register("newPassword")} className="auth-input" placeholder={t("newPasswordPlaceholder")} />
                    {!!errors.newPassword && !!errors.newPassword?.message && <ErrorEl message={t("passwordError")} />}
                </div>
                <div className="w-full">
                    <label className="mb-1 block">{t('confirmPassword')}</label>
                    <input {...register("confirmPassword")} className="auth-input" placeholder={t("confirmPasswordPlaceholder")} />
                    {!!errors.newPassword && !!errors.newPassword?.message && <ErrorEl message={t("confirmPasswordError")} />}
                </div>
                <SubmitBtn isSubmitting={isSubmitting} />
                <div className="w-full flex justify-center gap-2">
                    <p className="">{t('rememberedPassword')}</p>
                    <button onClick={() => setFormType("login")} type="button" className="prevent-body-trigger duration-300 text-blue-500 hover:text-blue-600">{t('login')}</button>
                </div>
            </form>
        </>
    )
}



const SubmitBtn = ({ isSubmitting }: { isSubmitting: boolean }) => {
    const t = useTranslations('authentication');
    if (isSubmitting) return <Loader />
    return <Button size="auth" className="mt-2  text-white font-semibold" type="submit">
        {t("submit")}
    </Button>
}

function ErrorEl({ message }: { message: string }) {
    return (
        <p className="text-red-500 mt-1.5">{message}</p>
    )
}

const Loader = () => {
    return <div className="w-full h-9 flex items-center justify-center">
        <LoadingSpinner />
    </div>
}

const SuccessMessage = ({ message }: { message: string }) => {
    const t = useTranslations('authentication');
    return <p>{message}</p>
}