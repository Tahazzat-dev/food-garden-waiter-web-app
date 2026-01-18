import "../globals.css";
import Container from '@/sharedComponents/wrapper/Container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ClientLink from "@/sharedComponents/header/ClientLink";
import RenderText from "@/sharedComponents/utils/RenderText";


export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Container className="text-center max-w-lg">

                <div className='text-center mx-auto flex items-center justify-center    '>
                    <Image className='w-[200px] lg:w-[300px] h-auto' src="/404.png" width={300} height={300} alt="404 Image" />
                </div>
                <h1 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <RenderText group="notFound" variable="title" />
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                    <RenderText group="notFound" variable="description" />
                </p>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <ClientLink href="/" >
                        <Button>
                            <RenderText group="notFound" variable="btnTxt" />
                        </Button>
                    </ClientLink>
                </div>
            </Container>
        </div>
    )
}