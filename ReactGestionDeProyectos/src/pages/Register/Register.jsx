import { useState } from "react"

function Register () {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [confirmed_password, setConfirmed_password] = useState('')

    let submit = (e) => {
        e.preventDefault()
        console.log(name)
    }

    

    return (
        <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto border border-blue-300 rounded-lg p-3"   method="post">
            <h1 className="font-black text-2x1">Register</h1>

            <div className="grid gap-2">
                <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Name: </label>
                
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                id="name" 
                name="name" 
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                placeholder="Enter your name"/>


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

                <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Confirm Password: </label>
                <input 
                value={confirmed_password}
                onChange={(e) => setConfirmed_password(e.target.value)}
                type="password" 
                id="confirmed_password" 
                name="confirmed_password"
                autoComplete="confirmed_password" 
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                placeholder="Enter to Confirm your password"/>


            </div>

            <button type="submit" className="bg-green-400 hover:bg-green-700 text:white font-medium py-2 px-4 rounded-lg">Submit</button>
        </form>

        
    )
}


export default Register