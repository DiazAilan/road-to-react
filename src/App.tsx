import './App.scss'

const list = [
  {
    id: 0,
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    numComments: 3,
    points: 4,
  },
  {
    id: 1,
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    numComments: 2,
    points: 5,
  },
  {
    id: 2,
    title: 'RxJS',
    url: 'https://rxjs.dev/',
    author: 'Unknown',
    numComments: 4,
    points: 3,
  },
]

function App() {
  return (
    <div>
      <h1>My Road to React</h1>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text'/>

      <hr/>

      <ul>
        {list.map(item => {
          return (
            <li key={item.id}>
              <span>
                <a href={item.url}>{item.title} - {item.author}</a>
              </span>
              <span> | {item.numComments} comments</span>
              <span> | {item.points} points</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App
