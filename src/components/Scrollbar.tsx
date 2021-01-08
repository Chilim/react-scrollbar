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
	const [config, setConfig] = React.useState({
		viewSize: { w: 0, h: 0 },
		containerSize: { w: 0, h: 0 },
		innerContainerHeight: 0,
	});

	React.useEffect(() => {
		if (innerRef) {
			setConfig(prevState => {
				const innerContainer = innerRef.current as HTMLElement;
				return {
					...prevState,
					viewSize: { w: viewWidth, h: viewHeight },
					innerContainerHeight: innerContainer?.clientHeight,
				};
			});
		}
	}, [innerRef, viewHeight, viewWidth]);

	return (
		<div
			className={'container'}
			style={{
				position: 'relative',
				overflow: 'hidden',
				height: config.viewSize.h,
				width: config.viewSize.w,
			}}
		>
			<ScrollTrack ref={trackRef}>
				<Tick ref={tickRef} trackHeight={config.viewSize.h} />
			</ScrollTrack>
			<div className={'inner-container'} style={{ position: 'absolute', top: 0 }} ref={innerRef}>
				{children}
			</div>
		</div>
	);
};

export default Scrollbar;
