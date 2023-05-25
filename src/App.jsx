import { useEffect, useState } from 'react'
import './App.scss'
import Users from './Components/Users/Users'
import Success from './Components/Success/Success'


function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [invites, setInvites] = useState([]);
  function onClickInvite(id) {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter(_id => _id !== id))
    }
    else
      setInvites(prev => [...prev, id]);
  }
  function onClickSendInvites() {
    setSuccess(true);
  }
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => setLoading(false));
  }, [])
  return (
    <div className='App'>

      {
        success ?
          <Success count={invites.length} /> :
          <Users invites={invites} onClickInvite={onClickInvite} onClickSendInvites={onClickSendInvites} isLoading={isLoading} items={users} />
      }
    </div>
  )
}

export default App
