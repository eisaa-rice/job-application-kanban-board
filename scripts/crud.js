export let applications = [];

export let appliedCount = 0;
export let inProgressCount = 0;
export let rejectedCount = 0;
export let offerCount = 0;

const recalculateCounts = () => {
  appliedCount = 0;
  inProgressCount = 0;
  rejectedCount = 0;
  offerCount = 0;

  applications.forEach((application) => {
    if (application.status === "apply") {
      appliedCount += 1;
    } else if (application.status === "progress") {
      inProgressCount += 1;
    } else if (application.status === "reject") {
      rejectedCount += 1;
    } else if (application.status === "offer") {
      offerCount += 1;
    }
  });
};

export const readApplications = () => {
  const storedApplications = localStorage.getItem("applications");
  if (!storedApplications) return;

  applications = JSON.parse(storedApplications);

  // parse string dates into javascript date objects
  applications.forEach(
    (application) =>
      (application.dateApplied = new Date(application.dateApplied)),
  );

  recalculateCounts();
};
readApplications();

const saveApplications = () => {
  localStorage.setItem("applications", JSON.stringify(applications));

  recalculateCounts();
};

export const createApplication = (role, company) => {
  applications.push({
    id: crypto.randomUUID(),
    role,
    company,
    dateApplied: new Date(),
    status: "apply",
  });

  saveApplications();
};

export const updateApplication = (applicationId, { role, company, status }) => {
  if (!applicationId) return;

  const application = applications.find((app) => app.id === applicationId);

  if (!application) return;

  if (role) {
    application.role = role;
  }

  if (company) {
    application.company = company;
  }

  if (status) {
    application.status = status;
  }

  saveApplications();
};

export const deleteApplication = (applicationId) => {
  const indexToDelete = applications.findIndex(
    (application) => application.id === applicationId,
  );

  if (indexToDelete === -1) return;

  applications.splice(indexToDelete, 1);

  saveApplications();
};
