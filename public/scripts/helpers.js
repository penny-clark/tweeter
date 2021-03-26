const daysPassed = function (timeCreated) {
  const dateCreated = new Date(timeCreated);
  const currentDay = new Date();
  const timePassedInDays = Math.floor(((currentDay - dateCreated) / 86400000))
  if (timePassedInDays < 1) {
    return `Today`;
  } 
  if (timePassedInDays === 1) {
    return `1 day ago`;
  }
  return `${timePassedInDays} days ago`
}

module.exports = { daysPassed }