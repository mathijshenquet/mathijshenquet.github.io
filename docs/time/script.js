document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("*[data-date-since]").forEach((elem) => {
        const $weeks = elem.querySelector(".weeks");
        const $days = elem.querySelector(".days");

        const startDate = moment(elem.dataset.dateSince);
        const currentDate = moment();
        const duration = moment.duration(currentDate.diff(startDate));

        if ($days) {
            const weeks = Math.floor(duration.asWeeks());
            const days = Math.floor(duration.asDays() % 7);

            $weeks.textContent = `${weeks} week${weeks === 1 ? "" : "s"}`;
            $days.textContent = `${days} day${days === 1 ? "" : "s"}`;
        } else {
            const weeks = Math.round(duration.asWeeks());
            $weeks.textContent = `${weeks} week${weeks === 1 ? "" : "s"}`;
        }
    });
});
