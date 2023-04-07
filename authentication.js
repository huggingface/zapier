module.exports = {
  type: 'custom',
  test: {
    headers: { authorization: 'Bearer {{bundle.authData.key}}' },
    removeMissingValuesFrom: { params: true },
    url: 'https://huggingface.co/api/whoami-v2',
  },
  fields: [
    {
      computed: false,
      key: 'key',
      required: true,
      label: 'Hugging Face API Token',
      type: 'password',
      helpText:
        'Hugging Face API Token with read access. Create/copy one from here: https://hf.co/settings/tokens.',
    },
  ],
  customConfig: {},
};
