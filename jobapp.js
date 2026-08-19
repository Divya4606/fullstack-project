// =============================
// LOGIN
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        if (email !== "" && password !== "") {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "jobappl.html";

        }

    });

}


// =============================
// LOGOUT
// =============================

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "jobapp.html";

}


// =============================
// JOB DATA
// =============================

let jobs =
    JSON.parse(localStorage.getItem("jobs")) || [];


// =============================
// ADD JOB
// =============================

const jobForm =
    document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const company =
            document.getElementById("company").value;

        const role =
            document.getElementById("role").value;

        const status =
            document.getElementById("status").value;


        const job = {

            id: Date.now(),

            company: company,

            role: role,

            status: status

        };


        jobs.push(job);

        localStorage.setItem(
            "jobs",
            JSON.stringify(jobs)
        );


        jobForm.reset();


        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById("jobModal")
            );

        modal.hide();


        displayJobs();

    });

}


// =============================
// DISPLAY JOBS
// =============================

function displayJobs(data = jobs) {

    const table =
        document.getElementById("jobTable");

    if (!table) return;

    table.innerHTML = "";


    data.forEach(function(job) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                <strong>${job.company}</strong>
            </td>

            <td>
                ${job.role}
            </td>

            <td>

                <span class="badge bg-primary">
                    ${job.status}
                </span>

            </td>

            <td>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="deleteJob(${job.id})"
                >
                    Delete
                </button>

            </td>

        `;

        table.appendChild(row);

    });


    updateStatistics();

}


// =============================
// DELETE JOB
// =============================

function deleteJob(id) {

    jobs =
        jobs.filter(function(job) {

            return job.id !== id;

        });


    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );


    displayJobs();

}


// =============================
// SEARCH
// =============================

function searchJobs() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filteredJobs =
        jobs.filter(function(job) {

            return (

                job.company
                    .toLowerCase()
                    .includes(search)

                ||

                job.role
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayJobs(filteredJobs);

}


// =============================
// STATISTICS
// =============================

function updateStatistics() {

    const total =
        jobs.length;

    const applied =
        jobs.filter(
            job => job.status === "Applied"
        ).length;

    const interview =
        jobs.filter(
            job => job.status === "Interview"
        ).length;

    const selected =
        jobs.filter(
            job => job.status === "Selected"
        ).length;


    const totalElement =
        document.getElementById("totalJobs");

    if (totalElement) {

        totalElement.textContent = total;

        document.getElementById("appliedJobs")
            .textContent = applied;

        document.getElementById("interviewJobs")
            .textContent = interview;

        document.getElementById("selectedJobs")
            .textContent = selected;

    }

}


// =============================
// INITIAL LOAD
// =============================

if (document.getElementById("jobTable")) {

    displayJobs();

}