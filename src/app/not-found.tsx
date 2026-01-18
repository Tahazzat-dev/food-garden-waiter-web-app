import Link from 'next/link'
import "./globals.css";
import Container from '@/sharedComponents/wrapper/Container';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Container className="text-center max-w-lg">

                <div className='text-center mx-auto flex items-center justify-center    '>
                    <Image className='w-[200px] lg:w-[300px] h-auto' src="/404.png" width={300} height={300} alt="404 Image" />
                </div>
                <h1 className="text-2xl text-center font-semibold text-gray-800 mb-2">
                    Oops! Page not found
                </h1>

                <p className="text-gray-600 mb-6 text-center">
                    The page you’re looking for doesn’t exist or has been moved.
                    Let’s get you back to something delicious.
                </p>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    {/* <Link
                        href="/"
                        className="px-6 py-3 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700 transition"
                    >
                        Back to Home
                    </Link> */}
                    <Link href="/">
                        <Button>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    )
}