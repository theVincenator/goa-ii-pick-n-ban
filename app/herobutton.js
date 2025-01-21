import Image from "next/image";
import { getHeroImageLocation } from "./assetlocator";

import "./herobutton.css"

const maskImage = "url(" + getHeroImageLocation("mask") + ")";

export default function HeroButton({ heroname, className, onSelectedHeroChange, isDisabled }) {
    const imageLocation = getHeroImageLocation(heroname);
    return (
        <button
            className={className}
            onClick={onSelectedHeroChange}
            disabled={isDisabled}
        >
            <div className="heroButtonContent">
                <Image
                    id="heroimg"
                    src={imageLocation}
                    width={220}
                    height={290}
                    alt=""
                    style={{ width: '100%', height: "100%" }} />
                <div className="nameOverlayBox" style={{ maskImage: maskImage }}>
                    <div className="nameOverlayText">
                        {heroname}
                    </div>
                </div>
            </div>
        </button >
    )
}