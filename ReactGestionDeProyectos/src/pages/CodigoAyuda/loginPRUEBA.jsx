import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
//import {useAuth} from '../hooks/auth';
import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';

const Login= () => {
    
    /*const {login} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })*/

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <div>
                <h1>LOGIN</h1>
            </div>
        <form>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          </form>
          </div>
    )

}

export default Login