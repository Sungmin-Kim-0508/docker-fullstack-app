import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"

function App() {
  const [lists, setLists] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    axios.get('/api/values')
      .then(res => {
        console.log('response: ', res.data)
        setLists(res.data)
      })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/value', { value: value })
      .then(response => {
        if (response.data.success) {
          console.log('response', response)
          setLists([...lists, response.data])
          setValue('')
        } else {
          alert('값을 DB에 넣는데 실패했습니다.')
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>환영합니다!</h1>
        </div>
        <div className="container">
          {lists && lists.map((list, index) => {
            console.log(list)
            return (
              <li key={index}>Hello</li>
            )
          })}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
              />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
