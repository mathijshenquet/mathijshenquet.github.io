document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("*[data-date-since]").forEach((elem) => {
        const $months = elem.querySelector(".months");
        const $weeks = elem.querySelector(".weeks");
        const $days = elem.querySelector(".days");

        const startDate = moment(elem.dataset.dateSince);
        const currentDate = moment();
        const duration = moment.duration(currentDate.diff(startDate));

        if ($months && $weeks && $days) {
            const months = Math.floor(duration.asMonths());
            const weeks = Math.floor((duration.asWeeks() % 4.3452) + 0.5);
            const days = Math.floor(duration.asDays() % 7);

            $months.textContent = `${months} month${months === 1 ? "" : "s"}`;
            $weeks.textContent = `${weeks} week${weeks === 1 ? "" : "s"}`;
            $days.textContent = `${days} day${days === 1 ? "" : "s"}`;
        } else if ($weeks && $days) {
            const weeks = Math.floor(duration.asWeeks());
            const days = Math.floor(duration.asDays() % 7);

            $weeks.textContent = `${weeks} week${weeks === 1 ? "" : "s"}`;
            $days.textContent = `${days} day${days === 1 ? "" : "s"}`;
        } else if ($months) {
            const months = Math.round(duration.asMonths());
            $months.textContent = `${months} month${months === 1 ? "" : "s"}`;
        } else if ($weeks) {
            const weeks = Math.round(duration.asWeeks());
            $weeks.textContent = `${weeks} week${weeks === 1 ? "" : "s"}`;
        }
    });
});
