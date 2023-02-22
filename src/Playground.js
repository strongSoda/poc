import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import BABY_TOYS_INFLUENCERS from "./baby_toy_influencers";
import LIFESTYLE_INFLUENCERS from "./lifestyle_influencers";
import { ModelConfiguration, getCategories, createReachout } from "./model";
import MOM_INFLUENCERS from "./mom_influencers";
import { useAsync } from "react-async-hook";

function Playground(props) {
  const [result, setResult] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [showCategories, setShowCategories] = React.useState(false);

  const [influencerCategory, setInfluencerCategory] = React.useState("");

  const [showReachout, setShowReachout] = React.useState(false);

  const [influencer, setInfluencer] = React.useState(null);

  const [showBookCall, setShowBookCall] = React.useState(false);

  const [openAiKey, setOpenAiKey] = React.useState(() => {
    const key = localStorage.getItem("openaikey");
    if (key && key.length > 0) {
      return key;
    } else {
      return "";
    }
  });

  const search = React.useCallback(
    async (query) => {
      setResult(query);
      setCategories(await getCategories(openAiKey, query));
    },
    [openAiKey]
  );

  const findInfluencers = (category) => {
    setInfluencerCategory(category);
  };

  useEffect(() => {
    console.log(influencer);
    if (influencer) setShowReachout(true);
  }, [influencer]);

  const onUpdateOpenAiKey = React.useCallback((key) => {
    setOpenAiKey(key);
    localStorage.setItem("openaikey", key);
  }, []);

  return (
    <div className="playground">
      <ModelConfiguration
        openAiKey={openAiKey}
        setOpenAiKey={onUpdateOpenAiKey}
      />
      <img
        className="logo"
        src="https://syncy.net/images/logo-p-500.png"
        alt="logo"
      />
      <h1>Syncy</h1>
      <Searchbar onSearch={search} />
      {result && (
        <Result result={result} setShowCategories={setShowCategories} />
      )}

      {showCategories && (
        <Categories categories={categories} findInfluencers={findInfluencers} />
      )}

      {influencerCategory && (
        <Influencers
          categories={categories}
          influencerCategory={influencerCategory}
          setInfluencer={setInfluencer}
          setShowReachout={setShowReachout}
          setShowBookCall={setShowBookCall}
        />
      )}

      {showReachout && (
        <Reachout
          category={influencerCategory}
          apiKey={openAiKey}
          influencer={influencer}
          setShowReachout={setShowReachout}
          setInfluencer={setInfluencer}
        />
      )}

      {showBookCall && (
        <BookCall influencer={influencer} setShowBookCall={setShowBookCall} />
      )}
    </div>
  );
}

function Searchbar({ onSearch }) {
  const [query, setQuery] = React.useState("baby products");

  const onSearchChange = React.useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const onHitEnter = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        onSearch(query);
      }
    },
    [onSearch, query]
  );

  return (
    <div>
      <input
        className="searchbar"
        type="text"
        placeholder="Search"
        value={query}
        onInput={onSearchChange}
        onKeyDown={onHitEnter}
      />
      <button
        className="searchbutton"
        type="submit"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}

function Result({ result, setShowCategories }) {
  const message = React.useMemo(
    () => `Influencers that are a best fit for ${result} are ...`,
    [result]
  );
  return (
    <div className="result">
      <img
        className="avatar"
        src="https://syncy.net/images/logo-p-500.png"
        alt="logo"
      />
      <TypeAnimation
        sequence={[
          message,
          1000,
          () => {
            console.log("Done typing!"); // Place optional callbacks anywhere in the array
            setShowCategories(true);
          },
        ]}
        wrapper="div"
        cursor={true}
        // repeat={Infinity}
        style={{ fontSize: "1em" }}
        speed={70}
      />
    </div>
  );
}

function Categories({ categories, findInfluencers }) {
  return (
    <div className="categories-container">
      <h2>
        <TypeAnimation
          sequence={[
            "Categories",
            () => {
              console.log("Done typing!"); // Place optional callbacks anywhere in the array
              // setShowCategories(true);
            },
          ]}
          wrapper="div"
          cursor={false}
          // repeat={Infinity}
          // style={{ fontSize: '1em' }}
        />
      </h2>
      <div className="categories">
        {categories.map((category) => (
          <div key={category} className="category">
            <h3>
              <TypeAnimation
                sequence={[
                  category,
                  () => {
                    console.log("Done typing!"); // Place optional callbacks anywhere in the array
                    // setShowCategories(true);
                  },
                ]}
                wrapper="div"
                cursor={false}
              />
            </h3>
            <button
              className="categorybutton"
              onClick={() => findInfluencers(category)}
            >
              Find Influencers
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Influencers({
  categories,
  influencerCategory,
  setInfluencer,
  setShowReachout,
  setShowBookCall,
}) {
  const INFLUENCERS = ((category) => {
    if (category === "Baby Toys Influencers" || category === categories[0]) {
      return BABY_TOYS_INFLUENCERS;
    } else if (category === "Mom Influencers" || category === categories[1]) {
      return MOM_INFLUENCERS;
    } else if (
      category === "Lifestyle Influencers" ||
      category === categories[2]
    ) {
      return LIFESTYLE_INFLUENCERS;
    }
  })(influencerCategory);

  const [influencers, setInfluencers] = React.useState(INFLUENCERS);

  useEffect(() => {
    setInfluencers(INFLUENCERS);
  }, [influencerCategory]);

  return (
    <div className="influencers">
      <h2>Results for {influencerCategory}</h2>
      <div className="influencer-list">
        {influencers.map((influencer) => (
          <Influencer
            key={influencer._id}
            influencer={influencer}
            setInfluencer={setInfluencer}
            setShowReachout={setShowReachout}
            setShowBookCall={setShowBookCall}
          />
        ))}
      </div>
    </div>
  );
}

const Influencer = ({
  influencer,
  setInfluencer,
  setShowReachout,
  setShowBookCall,
}) => {
  useEffect(() => {
    console.log(influencer);
  }, [influencer]);

  return (
    <div className="influencer">
      <div className="profile">
        <a href={influencer.profileData.profile?.url}>
          <div className="influencer-image">
            <div>
              <img
                className="influencer-img"
                src={influencer.profileData.profile?.picture}
                alt="influencer"
              />
            </div>
            <h3 className="influencer-name">
              {influencer.profileData.profile?.fullname}
            </h3>
          </div>
        </a>
        <div className="influencer-stats">
          <p>{influencer.profileData.profile?.followers} followers</p>
          <p>
            {(influencer.profileData.profile?.engagementRate * 100).toFixed(2)}%
            engagement
          </p>
          {/* <p>${influencer.cost} cost</p> */}
        </div>
        <div className="actions">
          <button
            className="action-button"
            onClick={() => setShowBookCall(true)}
          >
            Book Call
          </button>{" "}
          &nbsp;
          <button
            className="action-button"
            onClick={() => setInfluencer(influencer)}
          >
            Reachout
          </button>{" "}
          &nbsp;
          <button className="action-button">Add to Campaign</button>
        </div>
      </div>
      {/* <p className='desc'>{influencer.description}</p> */}
    </div>
  );
};

const Reachout = ({
  category,
  apiKey,
  influencer,
  setShowReachout,
  setInfluencer,
}) => {
  const [subject, setSubject] = React.useState("Sponsored Post Opportunity");

  const fetchMessage = async () => {
    return;
  };

  useEffect(() => {
    const load = async () => {
      const msg = await createReachout(apiKey, influencer, category);
      setMessage(msg);
    };
    load();
  }, [apiKey, category, influencer]);

  const [message, setMessage] = React.useState("Loading...");

  return (
    <div className="reachout">
      {/* close reachout sidebar */}
      <div className="close-reachout">
        <button
          className="close-reachout-button"
          onClick={() => {
            setInfluencer(null);
            setShowReachout(false);
          }}
        >
          X
        </button>
      </div>
      <h2>Reachout</h2>
      <div className="reachout-form">
        <form>
          <label>
            <p>Subject</p>
            <input
              type="text"
              name="name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
          <label>
            <p>Message</p>
            <textarea
              // increase textarea hiehgt
              style={{ height: "400px", width: "100%" }}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

const BookCall = ({ influencer, setShowBookCall }) => {
  return (
    <div className="book-call">
      {/* close reachout sidebar */}
      <div className="close-book-call">
        <button
          className="close-book-call-button"
          onClick={() => setShowBookCall(false)}
        >
          X
        </button>
      </div>
      <h2>Book Call</h2>
      <div className="book-call-form" style={{ height: "100%" }}>
        {/* embed calendly */}
        <iframe
          src="https://calendly.com/syncy/strategy"
          title="book call"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Playground;
