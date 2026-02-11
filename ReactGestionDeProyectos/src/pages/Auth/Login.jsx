import { useState } from "react"
import { login } from "../../services/authService"
import { useNavigate } from "react-router-dom"

function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        login({email: email, password: password}).then(res => {
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                localStorage.setItem('isAuthenticated', true)
                
                navigate('/dashboard')
            }
        })
    }

    return (
        <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto border border-blue-300 rounded-lg p-3"   method="post">
            <h1 className="font-black text-center text-2x1">Login</h1>

            {
            errors.length > 0 && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    {errors.map((error, index) => 
                    <li key={index}>{error}</li>
                    )}
                    
                </ul>
            </div>
            }

            <div className="grid gap-2">
                <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Email: </label>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                type="email"
                name="email" 
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                placeholder="Enter your email"/>

                <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Password: </label>
                <input
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                id="password" 
                name="password" 
                autoComplete="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                placeholder="Enter your password"/>

            </div>
            <button type="submit" className="bg-green-400 hover:bg-green-700  font-medium py-2 px-4 rounded-lg  mx-auto block">Submit</button>

        </form>
    )
}


export default Login