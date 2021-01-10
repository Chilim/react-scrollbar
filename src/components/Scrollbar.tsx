import React from 'react';
import ScrollTrack from './ScrollTrack';
import Tick from './Tick';

interface IScrollbar {
	rowLength: number;
	viewHeight: number;
	viewWidth: number;
	children: React.ReactElement[];
}

const Scrollbar: React.FC<IScrollbar> = (props: IScrollbar) => {
	const { viewWidth, viewHeight, children } = props;
	// const outerRef = React.useRef<HTMLElement | null>(null);
	const innerRef = React.useRef<HTMLDivElement | null>(null);
	const trackRef = React.useRef<HTMLDivElement | null>(null);
	const tickRef = React.useRef<HTMLDivElement | null>(null);
	const [ratio, setRation] = React.useState(1);
	const [scrollY, setScrollY] = React.useState(0);

	React.useEffect(() => {
		if (innerRef) {
			setRation(prev => {
				const innerContainer = innerRef.current as HTMLElement;
				return innerContainer?.clientHeight / viewHeight;
			});
		}
	}, [innerRef, viewHeight, viewWidth]);

	const onScroll = React.useCallback(
		y => {
			const newScrollY = y * ratio;
			setScrollY(-newScrollY);
		},
		[ratio]
	);

	return (
		<div
			className={'container'}
			style={{
				position: 'relative',
				overflow: 'hidden',
				height: viewHeight,
				width: viewWidth,
			}}
		>
			<ScrollTrack ref={trackRef}>
				<Tick ref={tickRef} trackHeight={viewHeight} onScroll={onScroll} />
			</ScrollTrack>
			<div
				className={'inner-container'}
				style={{ position: 'absolute', top: scrollY }}
				ref={innerRef}
			>
				{children}
			</div>
		</div>
	);
};

export default Scrollbar;
