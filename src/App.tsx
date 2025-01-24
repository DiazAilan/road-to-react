import { DropResult } from '@hello-pangea/dnd';
import html2canvas from 'html2canvas';
import { FormEvent, ReactNode, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.scss';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { InputWithLabel } from './InputLabel';
import usersMockup from './mockups/users.json';
import { User } from './models/user';
import { Slider } from './Slider';
import { StoriesList } from './StoriesList';
import { storiesReducer } from './storiesReducer';
import { getAsyncStories } from './storiesService';
import { useIsOverflow } from './useIsOverflow';
import { UserList } from './UsersList';
import { useStorageState } from './useStorageState';
import { SearchForm } from './SearchForm';

const App = () => {

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, hasError: false }
  );

  const [searchInput, setSearchInput] = useStorageState('search', 'React');
  const [searchQuery, setSearchQuery] = useState(searchInput);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [favoriteMascot, setFavoriteMascot] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [users, setUsers] = useState<User[]>(usersMockup);

  const printRef = useRef<HTMLDivElement>(null);

  const overflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(overflowRef, (isOverflowFromCallback) => {
    console.log(isOverflowFromCallback);
  });

  console.log(isOverflow)

  const handleFetchStories = useCallback(async () => {
    dispatchStories({type: 'STORIES_FETCH_INIT'})

    try {
      const stories = await getAsyncStories(searchQuery)
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: stories,
      });
    } catch {
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    }
    
  }, [searchQuery])

  useEffect(() => {handleFetchStories()}, [handleFetchStories]);

  function handleSearchInput(query: string): void {
    setSearchInput(query);
  }

  function handleDeleteStory(id: number): void {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: {id},
    })
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

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
    setSearchQuery(searchInput);

    event.preventDefault();
  }

  return (
    <>
      <h1>My Road to React</h1>

      <SearchForm
        onSubmit={handleSearchSubmit}
        searchInput={searchInput}
        onInputChange={handleSearchInput}
      />

      <hr/>

      {stories.hasError && <p>Something went wrong...</p>}
      
      {stories.isLoading
        ? <Loader/>
        : <StoriesList stories={stories.data} onDeleteStory={handleDeleteStory}/>
      }

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

      <hr/>

      <Slider initial={10} max={25} onChange={value => console.log(value)}/>

      <hr/>

      <div style={{ overflow: 'auto', height: '100px' }} ref={overflowRef}>
        <div style={{ height: '200px' }}>Overflow debugger</div>
      </div>
    </>
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

const Loader = () => (
  <div className='loader'>Loading...</div>
)

export default App
