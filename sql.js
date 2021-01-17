const QUERY = {
    GET_MOIM_LIST:
        "SELECT * FROM sociallounge.MOIM WHERE ( SEASON_ID = (SELECT SEASON_ID FROM sociallounge.SEASON WHERE VIEW_YN = 'Y') AND VIEW_YN = 'Y' AND TYPE = 'S') OR (TYPE = 'E' AND VIEW_YN = 'Y')",
};

module.exports = { QUERY };
