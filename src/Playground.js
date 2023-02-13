import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

const BABY_TOYS_INFLUENCERS = [
    {
        name: 'Tama Natural',
        image: 'https://tweettailor.com/assets/images/profiles/profile-1.png',
        description: 'Mama Natural is a YouTube channel that focuses on natural parenting, pregnancy, and healthy living. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-2.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-3.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
]

const MOM_INFLUENCERS = [
    {
        name: 'Mama Natural',
        image: 'https://tweettailor.com/assets/images/profiles/profile-1.png',
        description: 'Mama Natural is a YouTube channel that focuses on natural parenting, pregnancy, and healthy living. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-2.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-3.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
]

const LIFESTYLE_INFLUENCERS = [
    {
        name: 'Nama Natural',
        image: 'https://tweettailor.com/assets/images/profiles/profile-1.png',
        description: 'Mama Natural is a YouTube channel that focuses on natural parenting, pregnancy, and healthy living. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-2.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
    {
        name: 'Baby Gizmo',
        image: 'https://tweettailor.com/assets/images/profiles/profile-3.png',
        description: 'Baby Gizmo is a YouTube channel that focuses on baby gear reviews, parenting tips, and product recommendations. The channel has over 1.5 million subscribers and over 200 million views.',
        category: 'Baby Toys Influencers',
        followers: 1.5,
        engagement: 0.5,
        cost: 1000,
        link: 'https://www.youtube.com/channel/UCZQYQZ1J8w2Z7zZ4XZQZQjA'
    },
]

function Playground ( props ) {

    const [result, setResult] = React.useState('');
    const [showCategories, setShowCategories] = React.useState(false);

    const [influencerCategory, setInfluencerCategory] = React.useState('');

    const search = (query) => {
        setResult('Influencers that are a best fit for ' + query + ' are ...')
    }

    const findInfluencers = (category) => {
        setInfluencerCategory(category);
    }

return (
    <div className = "playground" >
        <img className="logo" src="https://syncy.net/images/logo-p-500.png" alt='logo'/>
        <h1>Syncy</h1>
        <Searchbar search={search} />
        {result && <Result result={result} setShowCategories={setShowCategories} />}

        {showCategories && <Categories findInfluencers={findInfluencers} />}

        {influencerCategory && <Influencers influencerCategory={influencerCategory} />}
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
        />
        </div>
    );
}

function Categories ({findInfluencers}) {
    return (
        <div>
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

function Influencers ({influencerCategory}) {
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
                    <Influencer influencer={influencer} />
                ))}
            </div>
        </div>
    );
}

const Influencer = ({ influencer }) => {
    return (
        <div className="influencer">
            <div className='profile'>
                    <a href={influencer.link}>
                <div className="influencer-image">
                        <div>
                            <img className='influencer-img' src={influencer.image} alt="influencer" />
                        </div>
                        <h3>{influencer.name}</h3>
                </div>
                    </a>
                <div className="influencer-stats">
                    <p>{influencer.followers}k followers</p>
                    <p>{influencer.engagement}% engagement</p>
                    <p>${influencer.cost} cost</p>
                </div>
                <div className='actions'>
                    <button className='action-button'>Reachout</button> &nbsp;
                    <button className='action-button'>Strategy</button>
                </div>
            </div>
            <p className='desc'>{influencer.description}</p>
        </div>
    );
}

export default Playground;
