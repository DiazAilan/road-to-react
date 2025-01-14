import { cloneElement, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import './App.scss';
import storiesMockup from './mockups/stories.json';
import usersMockup from './mockups/users.json';
import { Story } from './models/story';
import { User } from './models/user';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import html2canvas from 'html2canvas';

type ListProps = {
  list: Story[]
}

type InputWithLabelProps = {
  id: string
  value: string
  type?: string
  children: ReactNode
  isFocused: boolean
  onInputChange: (value: string) => void
}

function useStorageState(key:string, initialState: string): [string, Function] {
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialState
  ) 
    
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}

const App = () => {

  const stories: Story[] = storiesMockup;

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [favoriteMascot, setFavoriteMascot] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [users, setUsers] = useState<User[]>(usersMockup);

  const printRef = useRef<HTMLDivElement>(null);

  function handleSearch(query: string): void {
    setSearchTerm(query);
  }

  function handleButtonClick(): void {
    setIsButtonActive(!isButtonActive);
  }

  function handleMascotChange(mascotType: 'cat' | 'dog' | 'tortoise'): void {
    setFavoriteMascot(mascotType)
  }

  function handleCheckbox(): void {
    setIsChecked(!isChecked)
  }

  function handleDropdownElementSelection(index: number): void {
    console.log(`${index} selected`)
  }

  function handleDragUser(info: DropResult): void {
    if (info.destination) {
      setUsers(reorderList(users, info.source.index, info.destination.index))
    }
  }
  
  function reorderList(list: any[], startIndex: number, endIndex: number): any[] {
    const output = Array.from(list);
    const [removed] = output.splice(startIndex, 1);

    output.splice(endIndex, 0, removed);

    return output;
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDownloadImage(): Promise<void> {
    const element = printRef.current as HTMLDivElement;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  return (
    <>
      <h1>My Road to React</h1>
      
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr/>
      
      <List list={searchedStories}/>

      <Button onClick={handleButtonClick}>
        {isButtonActive ? 'Try again!' : 'Toggle me!'}
      </Button>

      <hr/>

      <RadioButton value={favoriteMascot === 'cat'} onToggle={() => handleMascotChange('cat')}>
        Cat
      </RadioButton>

      <RadioButton value={favoriteMascot === 'dog'} onToggle={() => handleMascotChange('dog')}>
        Dog
      </RadioButton>

      <RadioButton value={favoriteMascot === 'tortoise'} onToggle={() => handleMascotChange('tortoise')}>
        Tortoise
      </RadioButton>

      {favoriteMascot ? <p>Favorite Mascot: {favoriteMascot}</p> : null}

      <hr/>
      
      <Checkbox value={isChecked} onChange={handleCheckbox}>
        I'm checked? {String(isChecked)}
      </Checkbox>

      <hr/>

      <Dropdown
        onClickItem={handleDropdownElementSelection}
        triggerLabel='Dropdown'
        menu={[
          <button>Menu 1</button>,
          <button>Menu 2</button>
        ]}
      />

      <hr/>

      <UserList
        users={users}
        onDragEnd={handleDragUser}
        dragItemStyle={{background: 'lightblue', borderRadius: '16px'}}
      />

      <hr/>

      <Canvas printRef={printRef} onDownloadImage={handleDownloadImage}/>
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
    <span> | {item.numComments} comments</span>
    <span> | {item.points} points</span>
  </li>
)

const InputWithLabel = ({
  id,
  children,
  isFocused,
  onInputChange,
  type = 'text',
  value
}: InputWithLabelProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        autoFocus={isFocused}
        onChange={event => onInputChange(event.target.value)}
        ref={inputRef}
        type={type}
        value={value}
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

interface RadioButtonProps {
  value: boolean;
  onToggle: () => void;
  children: ReactNode
} 

const RadioButton = ({value, children, onToggle}: RadioButtonProps) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onToggle}></input>
      {children}
    </label>
  )
}

interface CheckboxProps {
  value: boolean;
  onChange: () => void;
  children: ReactNode
} 

const Checkbox = ({value, children, onChange}: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}></input>
      {children}
    </label>
  )
}

interface DropdownProps {
  onClickItem: (index: number) => void;
  triggerLabel: string;
  menu: ReactElement[];
}

const Dropdown = ({onClickItem, menu, triggerLabel}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen(): void {
    setIsOpen(!isOpen)
  }

  return (
    <div className='dropdown'>
      <Button onClick={handleOpen}>{triggerLabel}</Button>
      {isOpen
        ? <ul className="menu">
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item" onClick={() => onClickItem(index)}>
                {cloneElement(menuItem, {
                  onClick: () => setIsOpen(false)               
                })}
              </li>
            ))}
          </ul>
        : null}
    </div>
  )
}

interface UserListProps {
  users: User[],
  onDragEnd: (result: DropResult) => void
  dragItemStyle: {[key:string]: string}
  dragListStyle?: {[key:string]: string}
}

const UserList = ({users = [], onDragEnd, dragItemStyle, dragListStyle}: UserListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='droppable'>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...(snapshot.isDraggingOver ? dragListStyle : {}),
          }}
        >
          {users.map((user, index) => (
            <Draggable key={user.id} index={index} draggableId={user.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: '8px 16px',
                    ...provided.draggableProps.style,
                    ...(snapshot.isDragging ? dragItemStyle : {})
                  }}
                >
                  <UserItem user={user}></UserItem>
                </div> 
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

const UserItem = ({user}: {user: User}) => (
  <div>{user.firstName} {user.lastName}</div>
)

interface CanvasProps {
  onDownloadImage: () => void,
  printRef: React.RefObject<HTMLDivElement>
}

const Canvas = ({onDownloadImage: onDownloadImage, printRef}: CanvasProps) => (
  <div>
    <Button onClick={onDownloadImage}>
      Download as Image
    </Button>
    <div>I will not be in the image.</div>
    <div ref={printRef}>I will be in the image.</div>
  </div>
)

export default App
