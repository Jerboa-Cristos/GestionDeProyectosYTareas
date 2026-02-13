import { useState } from "react"
import { login } from "../../services/authService"
import { useNavigate } from "react-router-dom"

function Login () {
    const PantallaAzul = "flex bg-blueDark items-center justify-center min-h-screen";

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
        <div className={PantallaAzul}>
             <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md`}>

                <div className="flex justify-center mb-4">
                    <div className="bg-blueDark text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
                        M
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto rounded-lg p-3" method="post">
                <h1 className="text-2xl font-bold text-center text-blueDark mb-8">Login</h1>

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
                <label className="text-blueDark text-sm leading-none font-bold select-none peer-disabled:cursor">Email: </label>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                type="email"
                name="email" 
                className="mt-1 block w-full rounded-md px-3 py-2 bg-blueBase text-2x2 focus:border-blueDark sm:text-sm placeholder-blueblue" 
                placeholder="Enter your email"/>

                <label className="text-blueDark text-sm leading-none font-bold select-none peer-disabled:cursor">Password: </label>
                <input
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                id="password" 
                name="password" 
                autoComplete="password"
                className="mt-1 block w-full rounded-md px-3 py-2 bg-blueBase text-2x2 focus:border-blueDark sm:text-sm placeholder-blueblue" 
                placeholder="Enter your password"/>

                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4
                    rounded-md text-sm font-medium text-white bg-blueDark hover:bg-blueblue
                    transition-colors">Submit</button>
            </form>
        </div>
    </div>
    )
}


export default Login