import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import BABY_TOYS_INFLUENCERS from './baby_toy_influencers';
import LIFESTYLE_INFLUENCERS from './lifestyle_influencers';
import MOM_INFLUENCERS from './mom_influencers';

function Playground ( props ) {

    const [result, setResult] = React.useState('');
    const [showCategories, setShowCategories] = React.useState(false);

    const [influencerCategory, setInfluencerCategory] = React.useState('');

    const [showReachout , setShowReachout] = React.useState(false);

    const [influencer, setInfluencer] = React.useState(null);

    const [showBookCall, setShowBookCall] = React.useState(false);

    const search = (query) => {
        setResult('Influencers that are a best fit for ' + query + ' are ...')
    }

    const findInfluencers = (category) => {
        setInfluencerCategory(category);
    }

    useEffect(() => {
        console.log(influencer);
        if(influencer) setShowReachout(true);
    }, [influencer]);

return (
    <div className = "playground" >
        <img className="logo" src="https://syncy.net/images/logo-p-500.png" alt='logo'/>
        <h1>Syncy</h1>
        <Searchbar search={search} />
        {result && <Result result={result} setShowCategories={setShowCategories} />}

        {showCategories && <Categories findInfluencers={findInfluencers} />}

        {influencerCategory && <Influencers influencerCategory={influencerCategory} setInfluencer={setInfluencer} setShowReachout={setShowReachout} setShowBookCall={setShowBookCall} />}

        {showReachout && <Reachout influencer={influencer} setShowReachout={setShowReachout} setInfluencer={setInfluencer} />}

        {showBookCall && <BookCall influencer={influencer} setShowBookCall={setShowBookCall} />}
    </div>
);
}

function Searchbar ( {search} ) {
    
    const [query, setQuery] = React.useState('baby products');

    return (
        <div>
            <input className="searchbar" type="text" placeholder="Search" value={query} />
            <button className="searchbutton" type="submit" onClick={() => search(query)}>Search</button>
        </div>
    );
}

function Result ({result, setShowCategories}) {
    return (
        <div className="result">
        <img className="avatar" src="https://syncy.net/images/logo-p-500.png" alt='logo'/>
        <TypeAnimation
            sequence={[
                result,
                1000,
                () => {
                    console.log('Done typing!'); // Place optional callbacks anywhere in the array
                    setShowCategories(true);
                }
            ]}
            wrapper="div"
            cursor={true}
            // repeat={Infinity}
            style={{ fontSize: '1em' }}
            speed={70}
        />
        </div>
    );
}

function Categories ({findInfluencers}) {
    return (
        <div className='categories-container'>
            <h2>
            <TypeAnimation
                sequence={[
                    'Categories',
                    () => {
                        console.log('Done typing!'); // Place optional callbacks anywhere in the array
                        // setShowCategories(true);
                    }
                ]}
                wrapper="div"
                cursor={false}
                // repeat={Infinity}
                // style={{ fontSize: '1em' }}
            />
            </h2>
            <div className="categories">
                <div className="category">
                    <h3>
                    <TypeAnimation
                        sequence={[
                            'Mom Influencers',
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                // setShowCategories(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                    
                    />
                    </h3>
                    <button className="categorybutton" onClick={() => findInfluencers('Mom Influencers')}>Find Influencers</button>
                </div>
                <div className="category">
                    <h3>
                    <TypeAnimation
                        sequence={[
                            'Baby Toys Influencers',
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                // setShowCategories(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                    
                    />
                    </h3>
                    <button className="categorybutton" onClick={() => findInfluencers('Baby Toys Influencers')}>Find Influencers</button>
                </div>
                <div className="category">
                    <h3>
                    <TypeAnimation
                        sequence={[
                            'Lifestyle Influencers',
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                // setShowCategories(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                    
                    />
                    </h3>
                    <button className="categorybutton" onClick={() => findInfluencers('Lifestyle Influencers')}>Find Influencers</button>
                </div>
            </div>
        </div>
    );
}

function Influencers ({influencerCategory, setInfluencer, setShowReachout, setShowBookCall}) {
    const INFLUENCERS = ((category) => {
        if (category === 'Baby Toys Influencers') {
            return BABY_TOYS_INFLUENCERS;
        } else if (category === 'Mom Influencers') {
            return MOM_INFLUENCERS;
        } else if (category === 'Lifestyle Influencers') {
            return LIFESTYLE_INFLUENCERS;
        }
    })(influencerCategory)

    const [influencers, setInfluencers] = React.useState(INFLUENCERS);

    useEffect(() => {
        setInfluencers(INFLUENCERS);
    }, [influencerCategory]);

    return (
        <div className="influencers">
            <h2>Results for {influencerCategory}</h2>
            <div className="influencer-list">
                {influencers.map((influencer) => (
                    <Influencer key={influencer._id} influencer={influencer} setInfluencer={setInfluencer} setShowReachout={setShowReachout} setShowBookCall={setShowBookCall} />
                ))}
            </div>
        </div>
    );
}

const Influencer = ({ influencer, setInfluencer, setShowReachout, setShowBookCall }) => {
    useEffect(() => {
        console.log(influencer);
    }, [influencer]);

    return (
        <div className="influencer">
            <div className='profile'>
                    <a href={influencer.profileData.profile?.url}>
                <div className="influencer-image">
                        <div>
                            <img className='influencer-img' src={influencer.profileData.profile?.picture} alt="influencer" />
                        </div>
                        <h3 className='influencer-name'>{influencer.profileData.profile?.fullname}</h3>
                </div>
                    </a>
                <div className="influencer-stats">
                    <p>{influencer.profileData.profile?.followers} followers</p>
                    <p>{(influencer.profileData.profile?.engagementRate*100).toFixed(2)}% engagement</p>
                    {/* <p>${influencer.cost} cost</p> */}
                </div>
                <div className='actions'>
                    <button className='action-button' onClick={() => setShowBookCall(true)}>Book Call</button> &nbsp;
                    <button className='action-button' onClick={() => setInfluencer(influencer)}>Reachout</button> &nbsp;
                    <button className='action-button'>Add to Campaign</button>
                </div>
            </div>
            {/* <p className='desc'>{influencer.description}</p> */}
        </div>
    );
}

const Reachout = ({ influencer, setShowReachout, setInfluencer }) => {
    return (
        <div className="reachout">

            {/* close reachout sidebar */}
            <div className="close-reachout">
                <button className="close-reachout-button" onClick={() => {
                    setInfluencer(null)
                    setShowReachout(false)
                }}>X</button>
            </div>
            <h2>Reachout</h2>
            <div className="reachout-form">
                <form>
                    <label>
                        <p>Subject</p>
                        <input type="text" name="name" value="Sponsored Post Opportunity" style={{width: '100%'}} />
                    </label>
                    <label>
                        <p>Message</p>
                        <textarea
                        // increase textarea hiehgt
                        style={{height: '400px', width: '100%'}}
                        name="message" value={`Hello ${influencer.profileData.profile?.fullname.split(' ')[0]}!,

It's great to meet you! My name is Joe, and I work with Syncy, a marketing agency. We're currently in the process of sourcing climate change influencers for our client, Earthshot. Earthshot is a non-profit focused on inspiring people to take climate action. We'd be looking to schedule a call between you and the founder of Earthshot to discuss a paid collaboration. Would this be of interest?

Cheers,
Imran
`} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

const BookCall = ({ influencer, setShowBookCall }) => {
    return (
        <div className="book-call">

            {/* close reachout sidebar */}
            <div className="close-book-call">
                <button className="close-book-call-button" onClick={() => setShowBookCall(false)}>X</button>
            </div>
            <h2>Book Call</h2>
            <div className="book-call-form" style={{height: '100%'}}>
                {/* embed calendly */}
                <iframe src="https://calendly.com/syncy/strategy" title='book call' width="100%" height="100%" frameBorder="0"></iframe>
            </div>
        </div>
    );
}


export default Playground;
