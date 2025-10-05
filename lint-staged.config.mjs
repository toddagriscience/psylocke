export default {
  '*.ts': (stagedFiles) => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
  '*.tsx': (stagedFiles) => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
