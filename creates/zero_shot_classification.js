const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);
    //   Take candidate labels string and split to list
    const candidate_labels = bundle.inputData.candidate_labels.split(',');
    candidate_labels.forEach((label, index) => {
        candidate_labels[index] = label.trim();
    });

    const result = await hf.zeroShotClassification({
      model: bundle.inputData.repo_id,
      inputs: bundle.inputData.text,
      parameters: {
        candidate_labels: candidate_labels,
      }
    })
    console.log(result)
    return { label: result[0].labels[0], score: result[0].scores[0]}
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
            key: 'candidate_labels',
            label: 'Candidate Labels',
            type: 'string',
            helpText:
                'The candidate labels you wish to use, separated by commas. (Ex. `positive, negative`)',
            required: true,
            list: false,
        },
        {
          key: 'repo_id',
          label: 'Repo ID',
          type: 'string',
          helpText:
            'The Repo ID for the model you wish to use. (Ex. `facebook/bart-large-mnli`)',
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
    key: 'zero_shot_classification',
    noun: 'Predictions',
    display: {
      label: 'Zero Shot Classification',
      description:
        'Use any compatible model from the Hugging Face to zero-shot classify input text using a ML model.',
      hidden: false,
      important: true,
    },
  };
  