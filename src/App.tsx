import './App.scss'

const welcome = {
  greeting: 'Hey',
  title: 'React'
}

const arrayToRender = ['a', 'b', 'c']

function App() {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>
      <label htmlFor="search" className='debugger'>
        Seach: 
        <input id="search" type="text"/>
      </label>
      {arrayToRender.map(item =>
        <p>{item}</p>
      )}
    </div>
  )
}

export default App
