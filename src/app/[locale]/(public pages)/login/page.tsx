import Container from '@/sharedComponents/wrapper/Container'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
    return <div className='w-full h-screen'>
        <Container className='flex-col gap-10 px-4 w-full h-full flex items-center justify-center' >
            <LoginForm />
        </Container>
    </div>
}
