const BANDSITE_API_KEY = "c0e0b864-68df-4155-a6e9-4f8b1c5171e5";

class BandSiteApi {
  constructor(apiKey) {
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    this.apiKey = apiKey;
  }
  async request(method, url, data = null) {
    const config = {
      method,
      url: `${this.baseUrl}${url}?api_key=${this.apiKey}`,
      data,
      headers: {},
    };
    if (method === "post" && data) {
      config.headers["Content-Type"] = "application/json";
    }
    try {
      const response = await axios(config);
      return response.data;
    } catch (err) {
      console.error(
        `Something went from while ${method} request to ${url}`,
        err
      );
      throw err;
    }
  }

  async getComments() {
    return this.request("get", "comments");
  }
  async getShows() {
    return this.request("get", "showdates");
  }
  async postComment(comment) {
    return this.request("post", "comments", comment);
  }
}

export const response = new BandSiteApi(BANDSITE_API_KEY);
