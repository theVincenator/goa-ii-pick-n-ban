import { getHeroImageLocation } from "./assetlocator";

export default function HeroCard({ heroname }) {
    const heroImage = "url(" + getHeroImageLocation(heroname) + ")";
    return (
        <div style={{ backgroundImage: heroImage }} className="heroCard" >
            <div className="heroCardName">
                {heroname}
            </div>
        </div>
    )
}