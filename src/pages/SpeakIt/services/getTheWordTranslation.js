const getTheWordTranslation = async (word) => {
    const translateApiRequest = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200508T143601Z.f972657fbe6da046.81ed2430b16576ab1e9b4d14e09e6eb9bfc0d076&text=${word}&lang=en-ru`);
    const response = await translateApiRequest.json();
    return response;
}

export default getTheWordTranslation;