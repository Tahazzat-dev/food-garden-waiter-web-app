'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { setLocale } from '@/redux/features/locale/locale';
import { Lang } from '@/types/types';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const languages = [
    {
        code: 'en',
        label: 'EN',
        flag: 'https://flagcdn.com/w20/us.png'
    },
    {
        code: 'bn',
        label: 'BN',
        flag: 'https://flagcdn.com/w20/bd.png'
    }
];

type Props = {
    className?: string;
    type?: 'ghost' | 'default';
}

export default function LocaleSwitcher({ className = "", type = "default" }: Props) {
    const dispatch = useDispatch();
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const switchLocale = (newLocale: Lang) => {
        if (newLocale !== currentLocale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
            dispatch(setLocale(newLocale));
        }
        // setSelectedLocale(newLocale);
    };


    useEffect(() => {
        if (!currentLocale) return;
        dispatch(setLocale(currentLocale as Lang));
    }, [dispatch])

    return (
        <div className={clsx("ml-3", className)}>
            <Select defaultValue={currentLocale} onValueChange={switchLocale}>
                <SelectTrigger className={clsx("gap-2", type === "ghost" ? "!outline-none !px-0 !py-0 !border-none !bg-transparent !shadow-none !text-white" : "")}>
                    <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent className='z-[9999] !bg-white text-black'>
                    {languages.map(lang => (
                        <SelectItem className='outline-none border border-transparent hover:border-slate-400 rounded-[6px]' key={lang.code} value={lang.code}>
                            <div className="flex items-center gap-2">
                                <Image
                                    className='border border-slate-50/50'
                                    src={lang.flag}
                                    alt={lang.label}
                                    width={20}
                                    height={14}
                                />
                                <span>{lang.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}