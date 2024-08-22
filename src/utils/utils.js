export const sanitiseObjects = (objects, museum) => {
  if (!objects || !museum) return [];

  if (!Array.isArray(objects)) {
    const object = {
      id: objects.objectNumber,
      title: objects.title,
      artist: objects.principalOrFirstMaker,
      image: objects.webImage?.url,
      description: objects.longTitle,
      moreInfoLink: `https://www.rijksmuseum.nl/en/collection/${objects.objectNumber}`,
      museum: "rijks",
    };
    return object;
  }

  const result = objects.map((obj) => {
    if (museum === "rijks") {
      return {
        id: obj.objectNumber,
        title: obj.title,
        artist: obj.principalOrFirstMaker,
        image: obj.webImage?.url,
        description: obj.longTitle,
        moreInfoLink: `https://www.rijksmuseum.nl/en/collection/${obj.id}`,
        museum: "rijks",
      };
    } else if (museum === "chicago") {
      return {
        id: obj.id,
        title: obj.title,
        artist: obj.artist_title,
        image: `https://www.artic.edu/iiif/2/${obj.image_id}/full/843,/0/default.jpg`,
        description: obj.credit_line,
        moreInfoLink: `https://www.artic.edu/artworks/${obj.id}`,
        museum: "chicago",
      };
    }
  });

  return result;
};
