const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);
    const result = await hf.questionAnswer({
      model: bundle.inputData.repo_id,
      context: bundle.inputData.context,
      question: bundle.inputData.question
    })
    return result
  };
  
  module.exports = {
    operation: {
      inputFields: [
        {
          key: 'question',
          label: 'Question',
          type: 'text',
          helpText: 'The question you wish to ask about the given context',
          required: true,
          list: false,
          altersDynamicFields: false,
        },
        {
            key: 'context',
            label: 'Context',
            type: 'text',
            helpText: 'The context you wish to ask the question about',
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
      sample: { score: 0.9703431725502014, start: 25, end: 30, answer: 'Paris' },
      outputFields: [
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'start', label: 'Start', type: 'number' },
        { key: 'end', label: 'End', type: 'number' },
        { key: 'answer', label: 'Answer', type: 'text' },
      ],
      perform: perform,
    },
    key: 'question_answering',
    noun: 'Answer',
    display: {
      label: 'Question Answering',
      description:
        'Use any compatible model from the Hugging Face to answer questions about a given context using a ML model.',
      hidden: false,
      important: true,
    },
  };
  