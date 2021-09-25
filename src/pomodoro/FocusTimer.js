import React from "react";
import { minutesToDuration } from "../utils/duration";

function FocusTimer({
	timerInfo,
	isTimerRunning,
	decreaseFocus,
	increaseFocus,
}) {
	function decreaseCounter() {
		if (timerInfo.focusDuration === 5) return;
		decreaseFocus();
	}

	function increaseCounter() {
		if (timerInfo.focusDuration === 60) return;
		increaseFocus();
	}

	return (
		<div className="col">
			<div className="input-group input-group-lg mb-2">
				<span className="input-group-text" data-testid="duration-focus">
					{/* TODO: Update this text to display the current focus session duration */}
					Focus Duration: {minutesToDuration(timerInfo.focusDuration)}
				</span>
				<div className="input-group-append">
					{/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
					<button
						type="button"
						className="btn btn-secondary"
						data-testid="decrease-focus"
						disabled={isTimerRunning}
						name="decrease-focus"
						onClick={decreaseCounter}
					>
						<span className="oi oi-minus" />
					</button>
					{/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
					<button
						type="button"
						className="btn btn-secondary"
						data-testid="increase-focus"
						disabled={isTimerRunning}
						name="increase-focus"
						onClick={increaseCounter}
					>
						<span className="oi oi-plus" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default FocusTimer;
