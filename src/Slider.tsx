import { useRef, MouseEvent } from "react";

function getPercentage(current: number, max: number): number {
  return (100 * current) / max;
}

interface SliderProps {
  initial: number;
  max: number;
  onChange: (value: number) => void;
}

export const Slider = ({initial, max, onChange}: SliderProps) => {
  const initialPercentage = getPercentage(initial, max);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLElement>(null);

  const diff = useRef<number>(0);

  function getLeft(percentage: number): string {
    return `calc(${percentage}% - 5px)`;
  }

  function getValue(percentage: number, max: number): number {
    return (max / 100) * percentage;
  }

  function handleMouseMove(event: any): void {
    let newX =
      event.clientX -
      diff.current -
      sliderRef.current!.getBoundingClientRect().left;

    const end = sliderRef.current!.offsetWidth - thumbRef.current!.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max);

    thumbRef.current!.style.left = getLeft(newPercentage);

    currentRef.current!.textContent = newValue.toFixed(2).toString();

    onChange(newValue);
  }

  function handleMouseUp(): void {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseDown(event: MouseEvent<HTMLElement>): void {
    diff.current =
      event.clientX - thumbRef.current!.getBoundingClientRect().left;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <>
      <div className='slider-header'>
        <strong ref={currentRef}>{initial.toFixed(2)}</strong>
        &nbsp;/&nbsp;
        {max.toFixed(2)}
      </div>
      <div className="slider" ref={sliderRef}>
        <div
          className="slider-thumb"
          ref={thumbRef}
          onMouseDown={handleMouseDown}
          style={{ left: getLeft(initialPercentage) }}
        />
      </div>
    </>
  );
};