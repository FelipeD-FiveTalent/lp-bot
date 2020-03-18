class ParseGithub {
  constructor(branch) {
    this.branch = branch;
    this.customFieldValues = setcustomFieldValues(branch);
  }

  getcustomFieldValues() {
    return this.customFieldValues;
  }
}

const setcustomFieldValues = branch => {
  if (branch === 'master') {
    return { Status: 'Passed - Code Review', Environment: 'Development' };
  }
  if (branch === 'testing') {
    return { Status: 'QA', Environment: 'Testing' };
  }
  if (branch === 'staging') {
    return { Status: 'Passed - QA', Environment: 'Staging' };
  }
  if (branch === 'production') {
    return { Status: 'Production', Environment: 'Production' };
  }
};

module.exports = ParseGithub;
