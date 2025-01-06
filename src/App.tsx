import React from 'react';
import './App.scss'

type ListProps = {
  list: Story[]
}

type SearchProps = {
  onSearch: (query: string) => void 
}

interface Story {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('')

  const stories = [
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

  function handleSearch(query: string) {
    setSearchTerm(query)
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Road to React</h1>
      
      <Search onSearch={handleSearch}/>

      <hr/>
      
      <List list={searchedStories}/>
      
    </div>
    )
  }

const List = ({list}: ListProps) => (
  <ul>
      {list.map(item => (
        <ListItem item={item} key={item.id}/>
      ))}
    </ul>
)

const ListItem = ({item}: {item: Story}) => (
  <li>
    <span>
      <a href={item.url}>{item.title} - {item.author}</a>
    </span>
    <span> | {item.numComments} comments</span>
    <span> | {item.points} points</span>
  </li>
)

const Search = ({onSearch}: SearchProps) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value)
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
