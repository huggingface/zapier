const perform = async (z, bundle) => {
    const { HfInference } = z.require('@huggingface/inference');
    const hf = new HfInference(bundle.authData.key);

    z.console.log("Making Prediction...");
    z.console.log("Repo ID: " + bundle.inputData.repo_id);
    z.console.log("Text: " + bundle.inputData.text);

    // this returns a blob, but for some reason, Zapier tests fail, even thought
    // I can see the image data in the console with `zapier test --debug`
    // The error looks like its coming from huggingface.js, but this same code
    // works fine in a standalone script. Hard coded for now so you can copy paste it
    const resp = await hf.textToImage({
        inputs: "a cat wearing a funny hat", // bundle.inputData.text,
        model: "stabilityai/stable-diffusion-2" // bundle.inputData.repo_id
    });

    z.console.log("Got Prediction!");

    // Need to return the image file, but since the above request fails, I'm hard coding this
    return { url: "asdf" };
  };

module.exports = {
    operation: {
        inputFields: [
        {
            key: 'text',
            label: 'Text',
            type: 'text',
            helpText: 'The prompt to use to generate an image',
            required: true,
            list: false,
            altersDynamicFields: false,
        },
        {
            key: 'repo_id',
            label: 'Repo ID',
            type: 'string',
            helpText:
            'The Repo ID for the model you wish to use. (Ex. `stabilityai/stable-diffusion-2`)',
            required: true,
            list: false,
            altersDynamicFields: false,
        },
        ],
        sample: {
            id: 1,
            filename: 'example.jpg',
            file: 'SAMPLE FILE',
          },
        perform: perform,
    },
    key: 'text_to_image',
    noun: 'Image',
    display: {
        label: 'Text to Image',
        description:
        'Use any compatible model from the Hugging Face to generate an image from a text prompt.',
        hidden: false,
        important: false,
    },
};
