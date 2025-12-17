'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';

const languages = [
    {
        code: 'en',
        label: 'English',
        flag: 'https://flagcdn.com/w20/us.png'
    },
    {
        code: 'bn',
        label: 'বাংলা',
        flag: 'https://flagcdn.com/w20/bd.png'
    }
];

export default function LocaleSwitcher() {
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
        <Select defaultValue={currentLocale} onValueChange={switchLocale}>
            <SelectTrigger className="!bg-white text-black !outline-none !px-2 !py-0.5 !shadow-none gap-2">
                <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent className='!bg-white text-black'>
                {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                            <Image
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
    );
}