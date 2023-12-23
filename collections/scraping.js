import axios from "axios";
import { Cheerio } from "cheerio";

async function searchWebpage(url, searchQuery) {
  // Make a GET request to the webpage
  const response = await axios.get(url);

  // Parse the webpage's content
  const $ = Cheerio.load(response.data);

  // Find the search bar element (you'll need to know its HTML properties)
  const searchForm = $("form#search");
  const searchInputName = searchForm.find("input[name=search]").attr("name");

  // Use the search bar by making a new request with the search term
  const searchResponse = await axios.get(url, {
    params: {
      [searchInputName]: searchQuery,
    },
  });

  // Parse the search results
  const searchResults = Cheerio.load(searchResponse.data);

  // Extract and return the information you need from the search results
  // This will depend on the structure of the webpage
  const results = searchResults("div.result")
    .map((i, el) => {
      return $(el).text();
    })
    .get();

  return results;
}

searchWebpage("https://www.freecodecamp.org/", "javascript");
