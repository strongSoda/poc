import React from "react";
import { Configuration, OpenAIApi } from "openai";

async function query(apiKey, prompt) {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 0,
  });
  return response.data.choices[0].text;
}

export async function createReachout(apiKey, influencer, category) {
  if (!apiKey || apiKey.length === 0) {
    console.warn("No openai key set. Returning precanned response");

    return `Hello ${influencer.profileData.profile?.fullname.split(" ")[0]}!,

It's great to meet you! My name is Joe, and I work with Syncy, a marketing agency. We're currently in the process of sourcing climate change influencers for our client, Earthshot. Earthshot is a non-profit focused on inspiring people to take climate action. We'd be looking to schedule a call between you and the founder of Earthshot to discuss a paid collaboration. Would this be of interest?

Cheers,
<Your name>
`;
  }

  return await query(
    apiKey,
    `
    You are a large nerual network trained on a large corpus of text from the internet.
    Your goal is to help a human to reach out to influencers that match a given interest or category.
    You are creating an initial reach out message with the goal of getting the influencer to respond to you and understanding the proposal the user has put forward.
    Be kind and sincere in the message.
    The influencers name is ${influencer.profileData.profile?.fullname}.
    The influencers engagement rate is ${
      influencer.profileData.profile?.engagementRate * 100
    } and has ${
      influencer.profileData.profile?.followers
    } followers. The influencers category is ${category}.
    Please return a message that you would send to the influencer.
    `
  );
}

export async function getCategories(apiKey, keyword) {
  if (!apiKey || apiKey.length === 0) {
    console.warn("No openai key set. Returning precanned response");
    return [
      "Mom Influencers",
      "Baby Toys Influencers",
      "Lifestyle Influencers",
    ];
  }

  const raw = await query(
    apiKey,
    `
    You are a large nerual network trained on a large corpus of text from the internet.
    Your goal is to help a human to find influencers that match a given keyword. You are aiming to return the right category of incluencer.
    Please return a list of categories with up to 3 categories. The answer should be in the format:
    ["category1", "category2", "category3"]

    Plaese ensure the answer is a valid json array. If you cannot return a valid JSON array, please return an empty array.

    Please return a list of categories for the keyword "${keyword}".
    `
  );

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse response", raw);
    return [];
  }
}

export function ModelConfiguration({ openAiKey, setOpenAiKey }) {
  const [showModelConfig, setShowModelConfig] = React.useState(false);

  return (
    <div className="model-config">
      {!showModelConfig && (
        <div onClick={() => setShowModelConfig(true)}>??????</div>
      )}
      {showModelConfig && (
        <div className="model-config__content">
          <div className="model-config__header">
            <h3>Model Configuration</h3>
            <button onClick={() => setShowModelConfig(false)}>x</button>
          </div>
          <div className="model-config__input">
            <label>OpenAI API Token</label>
            <input
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
