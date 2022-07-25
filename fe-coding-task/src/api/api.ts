import axios from "axios";

const baseURL = "https://data.ssb.no/api/v0/no/table/07241";

export interface Selection {
  filter: string;
  values: string[];
}

export interface QueryItem {
  code: string;
  selection: Selection;
}

export type RequestPayload = QueryItem[];

export const fetchData = async (query: RequestPayload) => {
  return await axios
    .post(baseURL, {
      query: query,
      response: { format: "json" },
    })
    .then((result) => result.data)
    .catch((err) => console.error(err));
};
