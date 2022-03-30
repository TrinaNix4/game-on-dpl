import { useContext, useState } from "react"
import { parsePath, useParams } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"

const Register = ()=>{
    const [email, setEmail] = useState('test1@test.com')
    const [password, setPassword] = useState('123456')
    const [name, setName] = useState('user1')
    const auth = useContext(AuthContext)
    // not need but nice for UX
    // const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        // with devise_token_auth
        // email must be 'valid' email and unique
        // password must be greater than = 6 chars in length
        auth.handleRegister({email, password, name})
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <p>email</p>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}/>
                {/* TODO: make work, Won't work name is getting filtered out in devise register create */}
                <p>name</p>
                <input value={name} onChange={(e)=> setName(e.target.value)}/>
                <p>password</p>
                <input value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button>register</button>
            </form>
        </div>
    )
}
export default Register

