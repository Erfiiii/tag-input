import { createServer } from "miragejs";

export const initServer = () =>
  createServer({
    routes() {
      this.get("/api/tags", () => [
        {
          id: "apple",
          label: "Apple",
        },
        {
          id: "gillette",
          label: "Gillette",
        },
        {
          id: "mastercard",
          label: "Mastercard",
        },
        {
          id: "the-walt-disney-company",
          label: "The Walt Disney Company",
        },
        {
          id: "facebook",
          label: "Facebook",
        },
        {
          id: "louis-vuitton",
          label: "Louis Vuitton",
        },
      ]);
    },
  });
