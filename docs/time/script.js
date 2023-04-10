
const $weeks = document.getElementById("weeks");
const $days = document.getElementById("days");

document.addEventListener("DOMContentLoaded", function() {
    const startDate = moment("2022-11-14");
    const currentDate = moment();
    const duration = moment.duration(currentDate.diff(startDate));
    
    const weeks = Math.floor(duration.asWeeks());
    const days = Math.floor(duration.asDays() % 7);

    $weeks.textContent = `${weeks} week${weeks === 1 ? '' : 's'}`;
    $days.textContent = `${days} day${days === 1 ? '' : 's'}`;
});
