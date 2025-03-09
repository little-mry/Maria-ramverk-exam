const baseUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'


export const fetchKey = async () => {
    const response = await fetch(`${baseUrl}/keys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) throw new Error('Kunde inte hämta nyckeln')

    const data: { key: string } = await response.json()
    return data.key

}


