const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const meridiem = document.getElementById('meridiem');
const setAlarm = document.getElementById('setAlarm');
const alarmList = document.getElementById('list');
let alarms = [];


/**
 * Updates the displayed time including hours, minutes, seconds, and meridiem.
 * Also triggers alarms if their times match the current time.
 */
function updateTime(){
    const now = new Date();
    hours.innerHTML = now.getHours() <= 12 ? String(now.getHours()).padStart(2, '0') : String(now.getHours() - 12).padStart(2, '0');
    minutes.innerHTML = String(now.getMinutes()).padStart(2, '0');
    seconds.innerHTML = String(now.getSeconds()).padStart(2, '0');
    meridiem.innerHTML = now.getHours() >= 12 ? 'PM' : 'AM';
    triggerAlarm(hours.innerHTML + ':' +  minutes.innerHTML + ':' + seconds.innerHTML + meridiem.innerHTML);
}

/**
 * Renders the list of alarms by clearing the existing list and adding each alarm to the DOM.
 */
function renderList(){
    alarmList.innerHTML = '';
    for (let i = 0; i < alarms.length; i++) {
        addToDOM(alarms[i]);
    }
}

/**
 * Renders the list of alarms by clearing the existing list and adding each alarm to the DOM.
 */
function addToDOM(alarm){
    const li = document.createElement('li');
    li.innerHTML = `<label for="${alarm.id}">${alarm.target}</label>
                    <button type="button" class="delete" data-id="${alarm.id}">Delete</button>`;
    alarmList.append(li);
}

/**
 * Adds an alarm to the list of alarms and renders the updated list.
 *
 * @param {string} alarmTime - The time to set the alarm for.
 */
function addAlarm(alarmTime){
    const alarm = {
        id: alarms.length,
        target: alarmTime
    }
    alarms.push(alarm);
    renderList();
    alert('Alarm created successfully');
}

setAlarm.addEventListener('click', function(){
	const readTime = document.getElementById('alarmTime').value;
	if(readTime === ""){
		alert("Please enter some time to set an alarm");
		return;
	}
    const alarmTime= convertTo12HourFormat(readTime);
	addAlarm(alarmTime);
});

/**
 * Deletes an alarm from the list of alarms by its ID and re-renders the updated list.
 *
 * @param {string} alarmId - The ID of the alarm to delete.
 */
function deleteAlarm(alarmId){
    const alarmToRemove = alarms.find(alarm => alarm.id === Number(alarmId));
	const index = alarms.indexOf(alarmToRemove);
	alarms.splice(index,1);
    renderList();
}

/**
 * Initializes the application by setting up the time update interval
 * and adding click event listeners for alarm deletion.
 */
function initializeApp(){
    setInterval(updateTime, 1000);
    document.addEventListener('click', function(event){
        const target = event.target;
		if(target.className === 'delete'){
			const alarmId = target.dataset.id;
			deleteAlarm(alarmId);
			alert("Alarm deleted successfully");
			return;
		}
    });
}

/**
 * Converts a time string to a 12-hour format time string.
 *
 * @param {string} timeString - The time string to convert.
 * @returns {string} The converted 12-hour format time string.
 */
function convertTo12HourFormat(timeString){
    const [hours, minutes,seconds] = timeString.split(":");
    let period = 'AM';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
        period = "PM";
        if (hour > 12) {
            hour -= 12;
        }
    }
    return `${hour.toString().padStart(2, "0")}:${minutes}:${seconds}${period}`;
}

/**
 * Triggers alarms if their times match the provided current time.
 *
 * @param {string} currentTime - The current time in HH:MM:SSAM/PM format.
 */
function triggerAlarm(currentTime){
    for (let i = 0; i < alarms.length; i++) {
        if(alarms[i].target == currentTime){
            alert(`It's ${alarms[i].target}. Time to get going`);
        }
    }
}

initializeApp();
