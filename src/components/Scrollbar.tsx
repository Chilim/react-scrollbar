import React from 'react';
import styled from 'styled-components';
import ScrollTrack from './ScrollTrack';
import Tick from './Tick';

const ContainerStyled = styled.div<{ height: number; width: number }>`
	position: relative;
	overflow: hidden;
	height: ${({ height }: { height: number }) => `${height}px`};
	width: ${({ width }: { width: number }) => `${width}px`};
`;

interface IScrollbar {
	rowLength: number;
	viewHeight: number;
	viewWidth: number;
	children: React.ReactElement[];
}

const Scrollbar: React.FC<IScrollbar> = (props: IScrollbar) => {
	const { viewWidth, viewHeight, children } = props;
	const innerRef = React.useRef<HTMLDivElement | null>(null);
	const trackRef = React.useRef<HTMLDivElement | null>(null);
	const tickRef = React.useRef<HTMLDivElement | null>(null);
	const [innerHeight, setInnerHeight] = React.useState(0);
	const [ratio, setRation] = React.useState(1);
	const [scrollY, setScrollY] = React.useState(0);

	React.useEffect(() => {
		if (innerRef) {
			const innerHeight = innerRef.current?.clientHeight as number;
			const newRation = innerHeight / viewHeight;
			setRation(newRation);
			setInnerHeight(innerHeight);
		}
	}, [innerRef, viewHeight, viewWidth]);

	const onScroll = React.useCallback(y => {
		setScrollY(y);
	}, []);

	return (
		<ContainerStyled height={viewHeight} width={viewWidth} id='container'>
			<ScrollTrack ref={trackRef}>
				<Tick ref={tickRef} trackHeight={viewHeight} onScroll={onScroll} scrollY={scrollY} />
			</ScrollTrack>
		<div
				className={'inner-container'}
				style={{ position: 'absolute', top: -scrollY * ratio }}
				ref={innerRef}
		>
				{children}
			</div>
		</ContainerStyled>
	);
};

export default Scrollbar;
