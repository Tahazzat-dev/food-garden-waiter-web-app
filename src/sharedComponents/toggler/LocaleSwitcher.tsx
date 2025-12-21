'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import Image from 'next/image';

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
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    // const [selectedLocale, setSelectedLocale] = useState(locale);

    const switchLocale = (newLocale: string) => {
        if (newLocale !== currentLocale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
        // setSelectedLocale(newLocale);
    };
    return (
        <div className={clsx("ml-3", className)}>
            <Select defaultValue={currentLocale} onValueChange={switchLocale}>
                <SelectTrigger className={clsx("gap-2", type === "ghost" ? "!outline-none !px-0 !py-0 !border-none !bg-transparent !shadow-none !text-white" : "")}>
                    <SelectValue placeholder="Language" />
                </SelectTrigger>

                <SelectContent className='z-[9999] !bg-white text-black'>
                    {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
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