import LocaleSwitcher from '@/sharedComponents/toggler/LocaleSwitcher'
import Container from '@/sharedComponents/wrapper/Container'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
    return <div className='w-full flex flex-col h-full min-h-screen'>
        <Container className='px-4'>
            <LocaleSwitcher className='ml-0' />
        </Container>
        <Container className='flex-col grow gap-10 px-4 w-full h-full flex items-center justify-center' >
            <LoginForm />
        </Container>
    </div>
}
