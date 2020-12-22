import React from 'react';

interface IScrollbar {
  rowLength: number;
  viewHeight: number;
  viewWidth: number;
  children: React.ReactElement[];
}

const Scrollbar: React.FC<IScrollbar> = (props: IScrollbar) => {
  const {viewWidth, viewHeight, children} = props;
  // const outerRef = React.useRef<HTMLElement | null>(null);\
  const innerRef = React.useRef<HTMLElement | null>(null);
  const [config, setConfig] = React.useState({
    viewSize: {w: 0, h: 0},
    containerSize: {w: 0, h: 0},
    scrollHeight: 0,
  });
  const [dragging, setDragging] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (innerRef) {
      setConfig((prevState) => {
        const innerContainer = innerRef.current as HTMLElement;
        return {
          ...prevState,
          viewSize: {w: viewWidth, h: viewHeight},
          scrollHeight: innerContainer?.offsetHeight
        }
      })
    }
  }, [innerRef, viewHeight, viewWidth]);




  return (
    <div className={'container'}
         style={{position: 'relative', overflow: 'hidden', height: config.viewSize.h, width: config.viewSize.w}}>
      <div className={'scroll-track'}
           style={{position: 'relative', marginLeft: 'auto', width: '30px', height: '100%', background: 'lightgrey'}}>
        <div className={'tick'}
             style={{position: 'absolute', width: '100%', height: '30px', background: 'grey', cursor: 'grab'}}
             onMouseDown={() => setDragging(true)}
             onMouseUp={() => setDragging(false)}
        />
      </div>
      <div className={'inner-container'} style={{position: 'absolute', bottom: '50px'}}>
        {children}
      </div>
    </div>
  );
}

export default Scrollbar;
