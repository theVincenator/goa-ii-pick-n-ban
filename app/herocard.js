import { getHeroImageLocation } from "./assetlocator";

export default function HeroCard({ heroname }) {
    const heroImage = heroname == "" ? "" : "url(" + getHeroImageLocation(heroname) + ")";
    return (
        <div style={{ backgroundImage: heroImage }} className="heroCard" >
            <div className="heroCardName">
                {heroname}
            </div>
        </div >
    )
}