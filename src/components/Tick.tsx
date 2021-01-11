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
	innerContainerHeight: number;
	onScroll: (y: number) => void;
};

const Tick: React.ForwardRefRenderFunction<HTMLDivElement, PropsType> = (
	{ trackHeight, onScroll, innerContainerHeight }: PropsType,
	ref
) => {
	const [dragging, setDragging] = React.useState(false);
	const [clientY, setClinetY] = React.useState(0);

	React.useEffect(() => {
		const click = (event: MouseEvent) => {
			if (event.button === 0) {
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
			if (y < 0 || y > innerContainerHeight) {
				return;
			}
			onScroll(y);
			setClinetY(y);
		};
		if (dragging) {
			document.addEventListener('mousemove', scroll);
		}
		return () => {
			document.removeEventListener('mousemove', scroll);
		};
	}, [dragging, onScroll]);

	const onMouseDown = () => {
		setDragging(true);
	};

	const onMouseUp = () => {
		setDragging(false);
	};

	return (
		<TickStyle
			ref={ref}
			trackHeight={trackHeight}
			clientY={clientY}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		/>
	);
};

export default React.forwardRef(Tick);
