import logInImage from '../../../../public/assets/LogInImage/loginBg.png'
import LogInForm from './components/LogInForm'
export default function LoginPage() {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-cover bg-center'
            style={{
                backgroundImage: `url(${logInImage.src})`
            }}
        >
            <LogInForm></LogInForm>
        </div>
    )
}
