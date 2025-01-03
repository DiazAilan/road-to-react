import './App.scss'

interface ListItem {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

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

const anotherList = [
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
    title: 'RxJS',
    url: 'https://rxjs.dev/',
    author: 'Unknown',
    numComments: 4,
    points: 3,
  },
]

const App = () => (
  <div>
    <h1>My Road to React</h1>
    
    <Search/>

    <hr/>
    
    <List list={list}/>

    <hr/>

    <List list={anotherList}/>
    
  </div>
);

const List = ({list}: {list: ListItem[]}) => (
  <ul>
      {list.map(item => (
        <ListItem item={item} key={item.id}/>
      ))}
    </ul>
)

const ListItem = ({item}: {item: ListItem}) => (
  <li>
    <span>
      <a href={item.url}>{item.title} - {item.author}</a>
    </span>
    <span> | {item.numComments} comments</span>
    <span> | {item.points} points</span>
  </li>
)

const Search = () => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event);
    console.log(event.target.value)
  }

  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event)
  }

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={handleChange} onBlur={handleBlur}/>
    </div>
  )
}

export default App
