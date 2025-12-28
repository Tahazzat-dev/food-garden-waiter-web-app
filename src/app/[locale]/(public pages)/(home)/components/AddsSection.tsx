import { Button } from '@/components/ui/button'
import Container from '@/sharedComponents/wrapper/Container'
import { useTranslations } from 'next-intl'

export default function AddsSection() {
    const t = useTranslations('shared');
    return (
        <section className='w-full' >
            <Container className='mt-4'>
                <div className="w-full flex items-center justify-center min-h-[100px] md:min-h-[200px] bg-slate-400 dark:bg-slate-600 rounded-md lg:rounded-xl relative">

                    <h5 className='text-center'>{t('ads')}</h5>
                    <Button variant="primary" className='absolute top-[50%] translate-y-[-50%] right-10 lg:right-20' >
                        {t('visit')}
                    </Button>
                </div>
            </Container>
        </section>
    )
}
