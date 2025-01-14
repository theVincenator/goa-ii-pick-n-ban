import data from './heroes.json'

//sorted alphabetically
function sortedByName() {
    data.sort((hero1, hero2) => {
        if (hero1.name < hero2.name) {
            return -1;
        } else if (hero1.name > hero2.name) {

            return 1;
        } else {
            return 0;
        }
    });
}

sortedByName();

export default data;