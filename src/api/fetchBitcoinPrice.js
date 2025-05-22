const baseUrl = process.env.REACT_APP_API_BASE_URL;

const fetchBitcoinPrice = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/bitcoin-price`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Bitcoin price');
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return null;
  }
};

export default fetchBitcoinPrice;
