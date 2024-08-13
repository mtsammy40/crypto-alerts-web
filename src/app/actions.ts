'use server';

import axios from "axios";

export async function createAlert(formData: FormData) {
    console.log('submitting form ', formData)
    const requestBody = {
        pair: formData.get('crypto_id'),
        type: formData.get('price_action'),
        price: {value: Number(formData.get('price_value'))},
        notification: {
            channel: formData.get('notification_channel'),
            address: formData.get('address')
        }
    }

    axios.post('http://localhost:5001/api/v1/alerts', requestBody)
        .then(response => {
            if(response.status === 200) {
                console.log('Success!');
            } else {
                console.log('Failed!');
            }
        })
        .catch(error => console.error(error))
}

export async function fetchCurrencies(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5001/api/v1/currencies')
            .then(response => {
                if(response.status === 200) {
                    console.log('Success!', response.data);
                    resolve(response.data);
                } else {
                    console.log('Failed!');
                    reject('Failed to fetch currencies');
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            })
    });
}