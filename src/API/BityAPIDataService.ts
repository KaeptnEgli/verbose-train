import { RepeatOneSharp } from "@mui/icons-material";

type Currency = {
    code: string;
    tags: string[];
}

const bityRESTServerURL = 'https://exchange.api.bity.com/v2/';
const orderRoute = 'orders/';
const estimateOrderRoute = 'estimate';
const currenciesRoute = 'currencies';

async function getJson(url: string) {
    return fetch(url)
        .then((response) => response.json());
}

async function postJson(url: string, json: string) {
    const response = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    return response.json();
}

async function patchJson(url: string, json: string) {
    const response = await fetch(url, {
        method: 'patch',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    return response.json();
}

async function getCurrenciesCrypto() {
    return (await getJson(bityRESTServerURL + currenciesRoute))
        .currencies
        .filter(
            (currency: Currency) =>
                currency.tags.includes('crypto')
        );
}

// async function getCurrenciesFiat() {
//     retirm
// }

// async function evaluateGame(playerName: any, playerHand: any, gameMode = '') {
//     return getJson(gameRESTServerURL + gameRoute + playerName + playerHand + gameMode);


// async function createEntry(entry) {
//     return postJson(rankingsRESTServerURL + rankingRoute, entry);
// }

// async function updateEntry(id, value) {
//     return patchJson(rankingsRESTServerURL + rankingRoute + id, value);
// }

export default {
    getCurrenciesCrypto
};
function currency(currency: any, arg1: { tags: any; }) {
    throw new Error("Function not implemented.");
}

