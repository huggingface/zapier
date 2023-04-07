# Hugging Face Zapier Integration 🤗⚡️


## Setup

First install the dependencies for zapier platform cli (docs [here](https://platform.zapier.com/cli_tutorials/getting-started))

```
npm install -g zapier-platform-cli
```

Then auth with Zapier (must be on HF account to make updates to the official integration).

```
zapier login

# Or, if you sign in with SSO:

zapier login --sso
```

Then clone this repo and install the dependencies

```
git clone https://github.com/huggingface/zapier.git
cd zapier
npm i
```

## Development

To run the integration's tests:

```
zapier test
```
