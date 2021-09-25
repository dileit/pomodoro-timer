import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusTimer from "./FocusTimer";
import BreakTimer from "./BreakTimer";
import PlayPauseBtn from "./PlayPauseBtn";
import DisplayTimer from "./DisplayTimer";

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
	const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
	return {
		...prevState,
		timeRemaining,
	};
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */

function nextSession(focusDuration, breakDuration) {
	/**
	 * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
	 */
	return (currentSession) => {
		if (currentSession.label === "Focusing") {
			return {
				label: "On Break",
				timeRemaining: breakDuration * 60,
			};
		}
		return {
			label: "Focusing",
			timeRemaining: focusDuration * 60,
		};
	};
}

function Pomodoro() {
	// ToDo: Allow the user to adjust the focus and break duration.

	const initialState = {
		focusDuration: 25,
		breakDuration: 5,
		timerMinute: 25,
		timerSecond: 0,
		isSession: false,
		display: "none",
		onBreak: false,
		progressBar: 0,
	};

	// Timer starts out paused
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	const [timerInfo, setTimerInfo] = useState({ ...initialState });

	// The current session - null where there is no session running
	const [session, setSession] = useState(null);

	// Break Timer
	function onIncreaseBreakLength() {
		setTimerInfo((prevState) => {
			return {
				...prevState,
				breakDuration: prevState.breakDuration + 1,
			};
		});
	}

	function onDecreaseBreakLength() {
		setTimerInfo((prevState) => {
			return {
				...prevState,
				breakDuration: prevState.breakDuration - 1,
			};
		});
	}

	// Focus Timer

	function onIncreaseFocusLength() {
		setTimerInfo((prevState) => {
			return {
				...prevState,
				focusDuration: prevState.focusDuration + 5,
				timerMinute: prevState.timerMinute + 5,
			};
		});
	}

	function onDecreaseFocusLength() {
		setTimerInfo((prevState) => {
			return {
				...prevState,
				focusDuration: prevState.focusDuration - 5,
				timerMinute: prevState.timerMinute - 5,
			};
		});
	}

	/**
	 * Custom hook that invokes the callback function every second
	 *
	 * NOTE: You will not need to make changes to the callback function
	 */
	useInterval(
		() => {
			if (session.timeRemaining === 0) {
				new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
				return setSession(
					nextSession(timerInfo.focusDuration, timerInfo.breakDuration)
				);
			}
			setSession(nextTick);

			if (session.label === "Focusing") {
				timerInfo.progressBar =
					((timerInfo.focusDuration * 60 - session.timeRemaining) /
						(timerInfo.focusDuration * 60)) *
					100;
			} else {
				timerInfo.progressBar =
					((timerInfo.breakDuration * 60 - session.timeRemaining) /
						(timerInfo.breakDuration * 60)) *
					100;
			}
		},
		isTimerRunning ? 1000 : null
	);

	/**
	 * Called whenever the play/pause button is clicked.
	 */
	function playPause() {
		if (!isTimerRunning) {
			setTimerInfo({
				...timerInfo,
				display: "block",
				isSession: true,
			});
		}

		setIsTimerRunning((prevState) => {
			const nextState = !prevState;
			if (nextState) {
				setSession((prevStateSession) => {
					// If the timer is starting and the previous session is null,
					// start a focusing session.
					if (prevStateSession === null) {
						return {
							label: "Focusing",
							timeRemaining: timerInfo.focusDuration * 60,
						};
					}
					return prevStateSession;
				});
			}
			return nextState;
		});
	}

	// Stops / reset app

	function stopBtn() {
		setSession(null);
		setTimerInfo({ ...initialState });
		setIsTimerRunning(false);
	}

	return (
		<div className="pomodoro">
			<div className="row">
				<FocusTimer
					timerInfo={timerInfo}
					isTimerRunning={isTimerRunning}
					increaseFocus={onIncreaseFocusLength}
					decreaseFocus={onDecreaseFocusLength}
				/>

				<BreakTimer
					timerInfo={timerInfo}
					isTimerRunning={isTimerRunning}
					increaseBreak={onIncreaseBreakLength}
					decreaseBreak={onDecreaseBreakLength}
				/>
			</div>

			<PlayPauseBtn
				isTimerRunning={isTimerRunning}
				stopBtn={stopBtn}
				playPause={playPause}
			/>

			<DisplayTimer timerInfo={timerInfo} session={session} />
		</div>
	);
}

export default Pomodoro;
