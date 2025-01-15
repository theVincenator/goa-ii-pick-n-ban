const assetPrefix = "/goa-ii-pick-n-ban/";

export function getHeroImageLocation(heroname) {
    return "." + assetPrefix + "heroimages/" + heroname.toLowerCase() + ".png";
} 