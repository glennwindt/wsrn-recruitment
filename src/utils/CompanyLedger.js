export const ledger = {
  expenses: [],
  income: [],
  loans: [],
  meetings: [],
  businessMeals: [],
  excursions: [],
  misc: [],

  recordExpense(entry) {
    this.expenses.push(entry);
  },

  recordIncome(entry) {
    this.income.push(entry);
  },

  recordLoan(entry) {
    this.loans.push(entry);
  },

  recordMeeting(entry) {
    this.meetings.push(entry);
  },

  recordBusinessMeal(entry) {
    this.businessMeals.push(entry);
  },

  recordExcursion(entry) {
    this.excursions.push(entry);
  },

  recordMisc(entry) {
    this.misc.push(entry);
  },

  getSummary() {
    const totalExpenses = [
      ...this.expenses,
      ...this.loans,
      ...this.meetings,
      ...this.businessMeals,
      ...this.excursions,
      ...this.misc
    ].reduce((sum, e) => sum + parseFloat(e.amount || e.cost || 0), 0);

    const totalIncome = this.income.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0);

    return {
      totalExpenses: totalExpenses.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      balance: (totalIncome - totalExpenses).toFixed(2)
    };
  }
};

