
function NavLoading() {
    return (
        <svg role="img" className="loading__width" aria-labelledby="loading-aria" viewBox="0 0 80 35" preserveAspectRatio="none" >
            <rect className="loading__width" x="0" y="0" width="100%" height="100%" clipPath="url(#clipPath)" style={{ "fill": "url('#filler')" }} />
            <defs>
                <clipPath id="clipPath">
                    <rect className="loading__width" x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </clipPath>
                <linearGradient id="filler">
                    <stop offset="0.599964" stopColor="#ffff" stopOpacity="1" >
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

export default function Loading() {
    return (
        <div className="loading">
            <NavLoading />
            <NavLoading />
            <NavLoading />
            <NavLoading />
            <NavLoading />
            <NavLoading />
        </div>
    );
}

