import React from 'react';
import styled from 'styled-components';

type StyledPropsType = {
	clientY: number;
	trackHeight: number;
};

const TickStyle = styled.div.attrs<StyledPropsType>(({ clientY, trackHeight }) => ({
	style: {
		top: clientY < 0 ? 0 : clientY > trackHeight ? `${trackHeight - 50}px` : `${clientY}px`,
	},
}))<StyledPropsType>`
	position: absolute;
	width: 100%;
	height: 30px;
	cursor: grab;
	background-color: rgba(128, 128, 128, 0.5);
	&:hover {
		background-color: rgba(128, 128, 128, 1);
	}
`;

type PropsType = {
	trackHeight: number;
	scrollY: number;
	onScroll: (y: number) => void;
};

const Tick: React.ForwardRefRenderFunction<HTMLDivElement, PropsType> = (
	{ trackHeight, onScroll, scrollY }: PropsType,
	ref
) => {
	const [dragging, setDragging] = React.useState(false);

	React.useEffect(() => {
		const click = (event: MouseEvent) => {
			if ((event.target as HTMLDivElement).id === 'tick' && event.button === 0) {
				setDragging(true);
			}
		};
		const cleanup = () => {
			setDragging(false);
		};
		if (ref) {
			window.addEventListener('mousedown', click);
			window.addEventListener('mouseup', cleanup);
		}
		return () => {
			window.removeEventListener('mousedown', click);
			window.removeEventListener('mouseup', cleanup);
		};
	}, [ref]);

	React.useEffect(() => {
		const scroll = (event: MouseEvent) => {
			event.preventDefault();
			const y = event.pageY;
			if (y < 0 || y + 30 > trackHeight) {
				return;
			}
			onScroll(y);
		};
		if (dragging) {
			document.addEventListener('mousemove', scroll);
		}
		return () => {
			document.removeEventListener('mousemove', scroll);
		};
	}, [dragging, onScroll, trackHeight]);

	return <TickStyle ref={ref} trackHeight={trackHeight} clientY={scrollY} id={'tick'} />;
};

export default React.forwardRef(Tick);
