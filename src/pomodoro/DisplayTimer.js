import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

// {this.props.isSession === true ? "Session" : "Break"}

function DisplayTimer({ session, timerInfo }) {
	const title =
		session?.label === "Focusing"
			? `${minutesToDuration(timerInfo.focusDuration)}`
			: `${minutesToDuration(timerInfo.breakDuration)}`;

	return (
		<div>
			{session && (
				<div style={{ display: `${timerInfo.display}` }}>
					{/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
					<div className="row mb-2">
						<div className="col">
							{/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
							<h2
								data-testid="session-title"
								style={{ display: `${timerInfo.display}` }}
							>{`${session?.label} for ${title} minutes`}</h2>
							{/* TODO: Update message below correctly format the time remaining in the current session */}
							<p
								className="lead"
								data-testid="session-sub-title"
								style={{ display: `${timerInfo.display}` }}
							>
								{secondsToDuration(session?.timeRemaining)} remaining
							</p>
						</div>
					</div>
					<div className="row mb-2">
						<div className="col">
							<div className="progress" style={{ height: "20px" }}>
								<div
									className="progress-bar"
									role="progressbar"
									aria-valuemin="0"
									aria-valuemax="100"
									aria-valuenow={timerInfo.progressBar} // TODO: Increase aria-valuenow as elapsed time increases
									style={{ width: `${timerInfo.progressBar}%` }} // TODO: Increase width % as elapsed time increases
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default DisplayTimer;

// {session?.label} for {minutesToDuration(timerInfo.timerMinute)}{" "} minutes
