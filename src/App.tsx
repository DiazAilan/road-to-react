import React, { ReactNode } from 'react';
import './App.scss'
import storiesMockup from './mockups/stories.json'

type ListProps = {
  list: Story[]
}

type InputWithLabelProps = {
  id: string
  label: string
  value: string
  type?: string
  onInputChange: (value: string) => void 
}

interface Story {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

function useStorageState(key:string, initialState: string): [string, Function] {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  ) 
    
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}

const App = () => {

  const stories = storiesMockup

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React')
  const [isButtonActive, setIsButtonActive] = React.useState(false)

  function handleSearch(query: string): void {
    setSearchTerm(query);
  }

  function handleButtonClick(): void {
    setIsButtonActive(!isButtonActive);
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>My Road to React</h1>
      
      <InputWithLabel
        id='search'
        label='Search'
        value={searchTerm}
        onInputChange={handleSearch}/>
      <hr/>
      
      <List list={searchedStories}/>

      <Button onClick={handleButtonClick}>
        {isButtonActive ? 'Try again!' : 'Toggle me!'}
      </Button>
    </>
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

const InputWithLabel = ({id, label, value, type = 'text', onInputChange}: InputWithLabelProps) => {

  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
       id={id}
       type={type}
       value={value}
       onChange={event => onInputChange(event.target.value)}
      />
    </>
  )
}

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick: () => void
  children: ReactNode
}

const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default App
