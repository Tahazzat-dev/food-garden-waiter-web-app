import { useTranslations } from 'next-intl'

export default function NoFoodFound() {
    // hooks
    const t = useTranslations('shared')
    return (
        <div className="w-full min-h-[300px] flex items-center justify-center">
            <p>{t('noFoodFound')}</p>
        </div>
    )
}
