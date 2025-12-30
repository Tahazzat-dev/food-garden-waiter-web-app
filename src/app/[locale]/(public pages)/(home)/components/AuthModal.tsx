"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // optional icon
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                <Dialog.Content className=" fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[550px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                    <button onClick={closeModal} className="absolute top-4 right-4 rounded-full !px-2.5"
                    // variant="secondary"
                    > <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></button>
                    <div className="p-4">
                        <Dialog.Title className="fg_fs-lg text-center mt-4 mb-6">
                            {formType === "login" ? t('login') : t('register')}
                        </Dialog.Title>
                        {
                            formType === "login" ? <LoginForm setFormType={setFormType} /> : <RegisterForm setFormType={setFormType} />
                        }
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}


function ErrorEl({ message }: { message: string }) {
    return (
        <p className="text-red-500">{message}</p>
    )
}


// Login form
const loginSchema = z.object({
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>;
function LoginForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    // hooks
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });


    // handlers
    const onSubmit = async (data: LoginSchema) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form Submitted:", data);
        reset();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <div>
                <label>Phone</label>
                <input {...register("phone")} placeholder="Enter phone number" />
                {!!errors.phone && !!errors.phone?.message && <ErrorEl message={errors.phone.message} />}
            </div>

            {/* Password Field */}
            <div>
                <label>Password</label>
                <input {...register("password")} type="password" />
                {errors.password && errors.password.message && <ErrorEl message={errors.password.message} />}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
            </button>
        </form>
    )
}



// Register Form
// schema
const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

function RegisterForm({ setFormType }: { setFormType: Dispatch<SetStateAction<TAuthFormType>> }) {
    // hooks
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form Submitted:", data);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>

            {/* Name Field */}
            <div>
                <label>Name</label>
                <input {...register("name")} placeholder="John Doe" />
                {errors.name && errors.name.message && <ErrorEl message={errors.name.message} />}
            </div>

            {/* Email Field (Optional) */}
            <div>
                <label>Email (Optional)</label>
                <input {...register("email")} type="email" placeholder="john@example.com" />
                {errors.email && errors.email.message && <ErrorEl message={errors.email.message} />}
            </div>

            {/* Phone Field */}
            <div>
                <label>Phone</label>
                <input {...register("phone")} placeholder="1234567890" />
                {errors.phone && errors.phone.message && <ErrorEl message={errors.phone.message} />}
            </div>

            {/* Password Field */}
            <div>
                <label>Password</label>
                <input {...register("password")} type="password" />
                {errors.password && errors.password.message && <ErrorEl message={errors.password.message} />}
            </div>

            {/* Confirm Password Field */}
            <div>
                <label>Confirm Password</label>
                <input {...register("confirmPassword")} type="password" />
                {errors.confirmPassword && errors.confirmPassword.message && <ErrorEl message={errors.confirmPassword.message} />}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
            </button>
        </form>
    )
}
