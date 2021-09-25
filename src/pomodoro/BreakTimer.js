import React from "react";
import { minutesToDuration } from "../utils/duration";

function BreakTimer({
	timerInfo,
	isTimerRunning,
	increaseBreak,
	decreaseBreak,
}) {
	function decreaseCounter() {
		if (timerInfo.breakDuration === 1) return;
		decreaseBreak();
	}

	function increaseCounter() {
		if (timerInfo.breakDuration === 15) return;
		increaseBreak();
	}

	return (
		<div className="col">
			<div className="float-right">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid="duration-break">
						{/* TODO: Update this text to display the current break session duration */}
						Break Duration: {minutesToDuration(timerInfo.breakDuration)}
					</span>
					<div className="input-group-append">
						{/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="decrease-break"
							disabled={isTimerRunning}
							name="decrease-break"
							onClick={decreaseCounter}
						>
							<span className="oi oi-minus" />
						</button>
						{/* TODO: Implement increasing break duration and disable during a focus or break session*/}
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="increase-break"
							disabled={isTimerRunning}
							name="increase-break"
							onClick={increaseCounter}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BreakTimer;
