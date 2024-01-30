
function Block() {
    return (
        <svg className="loader__width" role="img" aria-labelledby="loading-aria" viewBox="0 0 500 300" preserveAspectRatio="none">
            <rect x="0" y="0" width="100%" height="100%" clipPath="url(#clip-path)" style={{ "fill": `url("#fill")` }} />
            <defs>
                <clipPath id="clip-path">
                    <rect x="0" y="200" rx="5" ry="5" width="100%" height="40" />
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="190" />
                    <rect x="0" y="250" rx="5" ry="5" width="100%" height="40" />
                </clipPath>
                <linearGradient id="fill">
                    <stop offset="0.599964" stopColor="#ffff" stopOpacity="1">
                        <animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="1s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="1.59996" stopColor="gray" stopOpacity="1" >
                        <animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="1s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="2.59996" stopColor="#ffff" stopOpacity="1" >
                        <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="1s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default function Loader__block() {
    return (
        <>
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
        </>
    );
}

