const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);
    const result = await hf.textClassification({
      model: bundle.inputData.repo_id,
      inputs: bundle.inputData.text
    })
    return result[0]
  };
  
  module.exports = {
    operation: {
      inputFields: [
        {
          key: 'text',
          label: 'Text',
          type: 'text',
          helpText: 'The text you wish to classify with the model',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
        {
          key: 'repo_id',
          label: 'Repo ID',
          type: 'string',
          helpText:
            'The Repo ID for the model you wish to use. (Ex. `finiteautomata/bertweet-base-sentiment-analysis`)',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
      ],
      sample: { label: 'NEG', score: 0.9814361929893494 },
      outputFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'score', label: 'Score', type: 'number' },
      ],
      perform: perform,
    },
    key: 'text_classification',
    noun: 'Predictions',
    display: {
      label: 'Text Classification',
      description:
        'Use any compatible model from the Hugging Face to classify input text using a ML model.',
      hidden: false,
      important: true,
    },
  };
  