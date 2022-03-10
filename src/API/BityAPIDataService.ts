import { RepeatOneSharp } from "@mui/icons-material";

type Currency = {
    code: string;
    tags: string[];
}

const bityRESTServerURL = 'https://exchange.api.bity.com/v2/';
const orderRoute = 'orders/';
const estimateOrderRoute = 'estimate';
const currenciesRoute = 'currencies';

// TODO: refine rest calls

async function getJson(url: string) {
    return fetch(url)
        .then((response) => response.json());
}

async function postJson(url: string, json: any) {
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

async function getCurrenciesFiat() {
    return (await getJson(bityRESTServerURL + currenciesRoute))
        .currencies
        .filter(
            (currency: Currency) =>
                currency.tags.includes('fiat')
        );
}

async function postEstimateOrder(inputAmount: string, inputCurrency: string, outputCurrency: string) {
    const payload = {
        input: {
            amount: inputAmount,
            currency: inputCurrency,
        },
        output: {
            currency: outputCurrency,
        }
    };
    return (await postJson(bityRESTServerURL + orderRoute + estimateOrderRoute, payload));
}

async function postPlayeOrder(inputAmount: string, inputCurrency: string, outputCurrency: string, inputAccount: string, outputAccount: string) {
    const payload = {
        input: {
            amount: inputAmount,
            crypto_address: inputAccount,
            currency: inputCurrency,
            type: "crypto_address"
        },
        output: {
            crypto_address: outputAccount,
            currency: outputCurrency,
            type: "crypto_address"
        }
    }
    return (await postJson(bityRESTServerURL + orderRoute, payload));
}

// async function evaluateGame(playerName: any, playerHand: any, gameMode = '') {
//     return getJson(gameRESTServerURL + gameRoute + playerName + playerHand + gameMode);


// async function createEntry(entry) {
//     return postJson(rankingsRESTServerURL + rankingRoute, entry);
// }

// async function updateEntry(id, value) {
//     return patchJson(rankingsRESTServerURL + rankingRoute + id, value);
// }

export default {
    getCurrenciesCrypto,
    postEstimateOrder,
};
