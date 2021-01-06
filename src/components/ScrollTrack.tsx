import React from 'react';
import styled from 'styled-components';

const ScrollTrack = styled.div`
	position: relative;
	margin-left: auto;
	width: 25px;
	height: 100%;
	background-color: lightgrey;
`;

type PropsType = {
	children: React.ReactElement;
};

export default React.forwardRef<HTMLDivElement, PropsType>(({ children, ...props }, ref) => (
	<ScrollTrack {...props} className={'scroll-track'} ref={ref}>
		{children}
	</ScrollTrack>
));
