
// Implement this function to generate emi / repayments slabs
const splitAmount = (totalAmount, parts) => {
  const amountPerPart = Math.floor((totalAmount / parts) * 100) / 100;
  const remainingAmount = totalAmount - amountPerPart * parts;

  const amounts = Array(parts).fill(amountPerPart);

  // Distribute the remaining amount to the last part
  amounts[parts - 1] += remainingAmount;
  return amounts;
};

// Helper function to calculate due dates based on the loan request date and term
const calculateDueDates = (startDate, term, frequency) => {
  const dueDates = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < term; i++) {
    if (frequency === "weekly") {
      currentDate.setDate(currentDate.getDate() + 7); // Add 7 days for weekly frequency
    }
    // You can add more conditions here for other frequencies like 'monthly', 'daily', etc.

    // Store the new due date
    dueDates.push(new Date(currentDate));
  }

  return dueDates;
};

module.exports = {
  splitAmount,
  calculateDueDates,
};
