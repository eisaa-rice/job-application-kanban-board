import {
  appliedCount,
  inProgressCount,
  offerCount,
  rejectedCount,
} from "./crud.js";

export const renderCounts = () => {
  const appliedCountLabel = document.querySelector(`#apply .column__count`);
  appliedCountLabel.textContent = appliedCount;

  const inProgressCountLabel = document.querySelector(
    `#progress .column__count`,
  );
  inProgressCountLabel.textContent = inProgressCount;

  const rejectedCountLabel = document.querySelector(`#reject .column__count`);
  rejectedCountLabel.textContent = rejectedCount;

  const offerCountLabel = document.querySelector(`#offer .column__count`);
  offerCountLabel.textContent = offerCount;
};

const renderItems = () => {};
