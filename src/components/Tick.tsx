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
	containerHeight: number;
	trackHeight: number;
};

const Tick = ({ containerHeight, trackHeight }: PropsType) => {
	const [dragging, setDragging] = React.useState(false);
	const [clientY, setClinetY] = React.useState(0);
	const tickRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const click = (event: MouseEvent) => {
			if (event.button === 0) {
				setDragging(true);
			}
		};

		const cleanup = () => {
			setDragging(false);
		};
		if (tickRef) {
			window.addEventListener('mousedown', click);
			window.addEventListener('mouseup', cleanup);
		}
		return () => {
			window.removeEventListener('mousedown', click);
			window.removeEventListener('mouseup', cleanup);
		};
	}, [tickRef]);

	React.useEffect(() => {
		const scroll = (event: MouseEvent) => {
			event.preventDefault();
			setClinetY(event.pageY);
		};
		if (dragging) {
			document.addEventListener('mousemove', scroll);
		}
		return () => {
			document.removeEventListener('mousemove', scroll);
		};
	}, [dragging]);

	const onMouseDown = () => {
		// console.log('onmousedown');
		setDragging(true);
	};

	const onMouseUp = () => {
		// console.log('onmouseup');
		setDragging(false);
	};

	return (
		<TickStyle
			trackHeight={trackHeight}
			clientY={clientY}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			ref={tickRef}
		/>
	);
};

export default Tick;
