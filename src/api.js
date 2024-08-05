import axios from "axios";

export const API_KEY = "ZiYSLV0G";

export const fetchData = async () => {
  const { data } = await axios.get(
    "https://www.rijksmuseum.nl/api/en/collection?key=ZiYSLV0G"
  );

  return data;
};

export const fetchSingleObject = async (id) => {
  const { data } = await axios.get(
    `https://www.rijksmuseum.nl/api/en/collection/${id}/?key=ZiYSLV0G`
  );
  return data;
};

export const fetchFacetsFromRijks = async () => {
  const { data } = await axios.get(
    `https://www.rijksmuseum.nl/api/en/collection?key=ZiYSLV0G`
  );
  return data.facets[0].facets;
};

export const searchByMakerFromRijks = async (maker) => {
  const { data } = await axios.get(
    `https://www.rijksmuseum.nl/api/en/collection?key=ZiYSLV0G&involvedMaker=${maker}&ps=30`
  );
  return data;
};

export const searchByMakerFromChicago = async (maker) => {
  try {
    const { data } = await axios.get(
      `https://api.artic.edu/api/v1/artworks/search?q=${maker}&limit=30`
    );

    const results = await Promise.all(
      data.data.map(async (datum) => {
        const artworkData = await axios.get(
          `https://api.artic.edu/api/v1/artworks/${datum.id}`
        );

        if (artworkData.data.data.artist_title === maker) {
          return artworkData.data.data;
        }
        return null;
      })
    );

    const filteredResults = results.filter((result) => result !== null);

    return filteredResults;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
};

export const fetchDataChicago = async () => {
  const { data } = await axios.get("https://api.artic.edu/api/v1/artworks");
  return data;
};

export const fetchSingleObjectChicago = async (id) => {
  const { data } = await axios.get(
    `https://api.artic.edu/api/v1/artworks/${id}`
  );
  return data;
};

export const fetchFacetsFromChicago = async (query) => {
  const { data } = await axios.get(
    `https://api.artic.edu/api/v1/agents/search?q=${query}&limit=100`
  );
  return data.data;
};
